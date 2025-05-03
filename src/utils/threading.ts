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
