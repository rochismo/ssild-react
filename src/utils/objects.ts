// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const haveSameStructure = (obj1: any, obj2: any): boolean => {
  if (typeof obj1 !== typeof obj2) {
    return false
  }

  if (typeof obj1 !== 'object' || obj1 == null || typeof obj2 !== 'object' || obj2 == null) {
    return false
  }

  const keys1 = Object.keys(obj1)
  const keys2 = Object.keys(obj2)

  if (keys1.length !== keys2.length) return false

  for (const key of keys1) {
    if (!keys2.includes(key)) return false

    const val1 = obj1[key]
    const val2 = obj2[key]

    const areObjects = typeof val1 === 'object' && val1 != null && typeof val2 === 'object' && val2 != null

    if (areObjects && !haveSameStructure(val1, val2)) {
      return false
    }

    if (typeof val1 !== typeof val2) {
      return false
    }
  }

  return true
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const mergePreservingNewStructure = (oldConfig: any, newConfig: any): any => {
  if (typeof newConfig !== 'object' || newConfig === null) {
    return newConfig
  }

  if (typeof oldConfig !== 'object' || oldConfig === null) {
    return newConfig
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const result: any = Array.isArray(newConfig) ? [] : {}

  for (const key of Object.keys(newConfig)) {
    const oldVal = oldConfig[key]
    const newVal = newConfig[key]

    const oldIsObj = typeof oldVal === 'object' && oldVal !== null
    const newIsObj = typeof newVal === 'object' && newVal !== null

    if (newIsObj && oldIsObj && Array.isArray(newVal) === Array.isArray(oldVal)) {
      result[key] = mergePreservingNewStructure(oldVal, newVal)
    } else if (typeof oldVal === typeof newVal) {
      result[key] = oldVal
    } else {
      result[key] = newVal
    }
  }

  return result
}
