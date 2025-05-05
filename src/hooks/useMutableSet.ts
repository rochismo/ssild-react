import { useCallback, useState } from 'react'

export const useMutableSet = <T>() => {
  const [set, setSet] = useState<Set<T>>(new Set<T>())

  const add = useCallback((value: T) => {
    setSet((prev) => {
      if (prev.has(value)) {
        return prev
      }
      return new Set([...prev, value])
    })
  }, [])

  const remove = useCallback((value: T) => {
    setSet((prev) => {
      if (!prev.has(value)) {
        return prev
      }
      const newSet = new Set(prev)
      newSet.delete(value)
      return newSet
    })
  }, [])

  return [set, add, remove] as const
}
