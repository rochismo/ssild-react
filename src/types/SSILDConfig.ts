export type SenseConfiguration = {
  sight: number
  hearing: number
  touch: number
}

export enum SSILDStatus {
  IDLE,
  STARTING,
  RUNNING,
  PAUSED,
}

export type VoiceSettings = {
  uri: string
  volume: number
}

export type SSILDConfig = {
  numberOfCycles: number
  unlimited: boolean
  cycleTimes: SenseConfiguration
  reminderTimes: SenseConfiguration
  voice: VoiceSettings
  startDelay: number
}
