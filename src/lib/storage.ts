import { useEffect, useState } from "react"

export function usePersistentState<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      if (typeof window === "undefined") return initial
      const raw = localStorage.getItem(key)
      if (!raw) return initial
      const parsed: unknown = JSON.parse(raw)
      if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return initial
      return { ...initial, ...parsed } as T
    } catch {
      return initial
    }
  })

  useEffect(() => {
    try {
      if (typeof window === "undefined") return
      localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // storage unavailable (private mode); keep in-memory state only
    }
  }, [key, value])

  return [value, setValue] as const
}
