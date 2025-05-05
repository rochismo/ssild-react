export const sleep = (seconds: number, signal?: AbortSignal): Promise<void> => {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      resolve()
    }, seconds * 1000)

    if (signal) {
      signal.addEventListener('abort', () => {
        clearTimeout(timeout)
        reject()
      })
    }
  })
}

export const pauseAwareSleep = async (
  seconds: number,
  signal?: AbortSignal,
  isPaused?: () => boolean,
  isStopped?: () => boolean
): Promise<void> => {
  const total = seconds * 1000
  const interval = 100 // ms
  let elapsed = 0

  return new Promise((resolve, reject) => {
    const check = async () => {
      if (signal?.aborted || isStopped?.()) {
        return reject(new Error('Aborted or Stopped'))
      }

      if (isPaused?.()) {
        // Pause polling every 100ms until unpaused
        setTimeout(check, interval)
        return
      }

      elapsed += interval
      if (elapsed >= total) {
        return resolve()
      }

      setTimeout(check, interval)
    }

    check()
  })
}
