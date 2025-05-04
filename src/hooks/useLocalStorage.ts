import { haveSameStructure, mergePreservingNewStructure } from '@/utils/objects'
import { useCallback, useRef, useState } from 'react'

export const useLocalStorage = <T>(key: string, expectedStructure: T) => {
  const structureRef = useRef(expectedStructure)

  const [value, setValue] = useState(() => {
    try {
      const storageValue = localStorage.getItem(key)
      if (storageValue == null) return structureRef.current
      const parsedValue = JSON.parse(storageValue) as T

      // The saved version must match the initial value
      if (haveSameStructure(parsedValue, structureRef.current)) {
        return parsedValue
      }
      // Attempt to recover what was lost to not screw the user
      const recoveredValue = mergePreservingNewStructure(parsedValue, structureRef.current)
      localStorage.setItem(key, JSON.stringify(recoveredValue))
      return recoveredValue
    } catch {
      return structureRef.current
    }
  })

  const saveValue = useCallback(
    (value: T) => {
      localStorage.setItem(key, JSON.stringify(value))
      setValue(value)
    },
    [key]
  )

  return [value, saveValue] as const
}
