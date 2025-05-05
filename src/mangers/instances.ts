import { SSILDManager } from './SSILDManager'
import { SSILDStatusManager } from './SSILDStatusManager'

export const ssildStatusManager = new SSILDStatusManager()
export const ssildManager = new SSILDManager(ssildStatusManager)
