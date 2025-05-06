import { SSILDConfig, SSILDStatus } from '@/types/SSILDConfig'
import { SSILDStatusManager } from './SSILDStatusManager'
import { pauseAwareSleep, sleep } from '@/utils/threading'
import { SENSES } from '@/constants/SSILD_CONSTANTS'
import { speak } from '@/utils/speech'

type Senses = 'sight' | 'hearing' | 'touch'

export class SSILDManager {
  private reminderTimeoutId: ReturnType<typeof setTimeout> | null = null
  private _abortController?: AbortController = undefined
  private _statusManager: SSILDStatusManager | null = null
  private _config: SSILDConfig | null = null

  public onCycleCompleted: (() => void) | null = null

  constructor(statusManager: SSILDStatusManager) {
    this._statusManager = statusManager
  }

  public initialize(config: SSILDConfig) {
    this._config = config
  }

  public abort() {
    this._abortController?.abort()
  }

  public async waitForStart() {
    try {
      this._abortController?.abort()
      this._abortController = new AbortController()

      if (this.config.startDelay <= 0) {
        return true
      }
      this.statusManager.changeStatus(SSILDStatus.STARTING)

      await pauseAwareSleep(
        this.config.startDelay,
        this._abortController?.signal,
        () => this.statusManager.isPaused,
        () => this.statusManager.isStopped
      )

      await this.waitIfPausedOrThrowIfStopped()
      return true
    } catch {
      return false
    }
  }

  public async start() {
    try {
      if (this.statusManager.isRunning) {
        return
      }
      this.statusManager.changeStatus(SSILDStatus.RUNNING)
      await this.performMainLoop()
    } catch {
      this.abort()
    } finally {
      this.clearTimeout()
      this.statusManager.changeStatus(SSILDStatus.IDLE)
    }
  }

  private async performMainLoop() {
    do {
      for (let cycleNumber = 0; cycleNumber < this.config.numberOfCycles; cycleNumber++) {
        for (const sense of SENSES) {
          await this.waitIfPausedOrThrowIfStopped()

          await this.processSense(sense)

          await this.waitIfPausedOrThrowIfStopped()
        }

        this.onCycleCompleted?.()
      }
    } while (this.config.unlimited)
  }

  private async processSense(sense: Senses) {
    speechSynthesis.cancel()

    this.clearTimeout()

    const senseTime = this.config.cycleTimes[sense]

    speak(sense, this.config.voice).then(() => {
      this.configureReminder(sense, senseTime)
    })

    await pauseAwareSleep(
      senseTime,
      this._abortController?.signal,
      () => this.statusManager.isPaused,
      () => this.statusManager.isStopped
    )
      .catch(() => {})
      .finally(this.clearTimeout.bind(this)) // Swallow error

    await this.waitIfPausedOrThrowIfStopped()
  }

  private configureReminder(sense: Senses, senseTime: number) {
    this.clearTimeout()

    const senseReminderTime = this.config.reminderTimes[sense]

    if (senseReminderTime <= 0) {
      return
    }

    this.startReminder(sense, senseTime)
  }

  private startReminder(sense: Senses, remainingTime: number) {
    let elapsed = 0
    const interval = this.config.reminderTimes[sense] * 1_000

    const remind = async () => {
      if (!this.statusManager.isPaused && !this.statusManager.isStopped && elapsed < remainingTime) {
        await speak(sense, this.config.voice)
        elapsed += this.config.reminderTimes[sense]
      }

      this.reminderTimeoutId = setTimeout(remind, interval)
    }

    this.reminderTimeoutId = setTimeout(remind, interval)
  }

  private async waitIfPausedOrThrowIfStopped() {
    while (this.statusManager.isPaused) {
      await sleep(0.1)
    }

    if (this.statusManager.isStopped) {
      throw new Error('Process was stopped')
    }
  }

  private clearTimeout() {
    if (this.reminderTimeoutId != null) {
      clearTimeout(this.reminderTimeoutId)
      this.reminderTimeoutId = null
    }
  }

  private get config() {
    if (this._config == null) {
      throw new Error('Config not initialized')
    }
    return this._config
  }

  private get statusManager() {
    if (this._statusManager == null) {
      throw new Error('Status Manager not found')
    }
    return this._statusManager
  }
}
