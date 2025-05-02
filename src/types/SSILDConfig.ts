export type SenseConfiguration = {
    sight: number;
    hearing: number;
    touch: number;
}

export enum SSILDStatus {
    IDLE,
    RUNNING,
    PAUSED
}

export type SSILDConfig = {
    numberOfCycles: number;
    unlimited: boolean;
    cycleTimes: SenseConfiguration;
    reminderTimes: SenseConfiguration;
    voice: string
}