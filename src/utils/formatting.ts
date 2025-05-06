export function formatDuration(seconds: number): string {
  const SECONDS_IN_MINUTE = 60
  const SECONDS_IN_HOUR = 3600
  const SECONDS_IN_DAY = 86400

  const days = Math.floor(seconds / SECONDS_IN_DAY)
  seconds %= SECONDS_IN_DAY

  const hours = Math.floor(seconds / SECONDS_IN_HOUR)
  seconds %= SECONDS_IN_HOUR

  const minutes = Math.floor(seconds / SECONDS_IN_MINUTE)
  seconds %= SECONDS_IN_MINUTE

  const parts: string[] = []

  if (days > 0) parts.push(`${days} day${days !== 1 ? 's' : ''}`)
  if (hours > 0) parts.push(`${hours} hour${hours !== 1 ? 's' : ''}`)
  if (minutes > 0) parts.push(`${minutes} minute${minutes !== 1 ? 's' : ''}`)
  if (seconds > 0) parts.push(`${seconds} second${seconds !== 1 ? 's' : ''}`)

  if (parts.length === 0) return '0 seconds'
  if (parts.length === 1) return parts[0]
  const last = parts.pop()
  return parts.join(', ') + ' and ' + last
}
