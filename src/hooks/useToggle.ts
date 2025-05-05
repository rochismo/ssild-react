import { useCallback, useState } from 'react'

export const useToggle = (initialValue = false) => {
  const [value, setValue] = useState(initialValue)

  const toggle = useCallback(() => {
    setValue((prev) => !prev)
  }, [])

  const enable = useCallback(() => {
    setValue(true)
  }, [])

  const disable = useCallback(() => {
    setValue(false)
  }, [])

  return [value, toggle, enable, disable] as const
}
