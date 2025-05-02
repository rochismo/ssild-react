/* eslint-disable @typescript-eslint/no-explicit-any */
import { Path, PathValue } from '@/types/utils'
import { useCallback, useState } from 'react'

function setDeepValue<T>(obj: T, path: string, value: any): T {
  const keys = path.split('.')
  const lastKey = keys.pop()!
  const target = keys.reduce((acc: any, key) => {
    if (!acc[key]) acc[key] = {}
    return acc[key]
  }, obj as any)

  target[lastKey] = value
  return { ...obj }
}

function readDeepValue<T, K extends Path<T>>(obj: T, path: K): PathValue<T, K> {
  const keys = path.split('.')
  let current: any = obj

  for (const key of keys) {
    if (current == null) return undefined as PathValue<T, K>
    current = current[key]
  }

  return current as PathValue<T, K>
}
export const useForm = <T>(initialValue: T, defaultValues: T) => {
  const [form, setForm] = useState(initialValue)

  const changeValue = useCallback(<K extends Path<T>>(key: K, value: PathValue<T, K>) => {
    setForm((prev) => setDeepValue({ ...prev }, key, value))
  }, [])

  const readValue = useCallback(
    <K extends Path<T>>(key: K): PathValue<T, K> => {
      return readDeepValue(form, key)
    },
    [form]
  )

  const reset = () => {
    setForm(structuredClone(defaultValues))
  }

  return {
    values: form,
    changeValue,
    reset,
    readValue,
  }
}
