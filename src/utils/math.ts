const OFFSET_IN_SECONDS = 5

export function determineMaximumValue(configuredValue: number) {
  return Math.max(configuredValue - OFFSET_IN_SECONDS, 0)
}
