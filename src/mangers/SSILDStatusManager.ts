import { SSILDStatus } from '@/types/SSILDConfig'

export class SSILDStatusManager {
  private status: SSILDStatus = SSILDStatus.IDLE

  public changeStatus(nextStatus: SSILDStatus) {
    this.status = nextStatus
  }

  public get isPaused() {
    return this.status === SSILDStatus.PAUSED
  }

  public get isStopped() {
    return this.status === SSILDStatus.IDLE
  }

  public get isRunning() {
    return this.status === SSILDStatus.RUNNING
  }
}
