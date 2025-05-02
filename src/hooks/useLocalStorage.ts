import { useCallback, useState } from "react"

export const useLocalStorage = <T>(key: string, initialValue: T) => {
    const [value, setValue] = useState(() => {
        const storageValue = localStorage.getItem(key);
        try {
            if (storageValue == null) return initialValue
            const parsedValue = JSON.parse(storageValue) as T
            return parsedValue
        } catch {
            return initialValue;
        }
    })

    const saveValue = useCallback((value: T) => {
        localStorage.setItem(key, JSON.stringify(value))
        setValue(value)
    }, [key])
    
    return [value, saveValue] as const
}