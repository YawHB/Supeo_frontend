import { useState, useEffect } from 'react'

export const useDebouncedInput = (initialValue, delay) => {
  const [value, setValue] = useState(initialValue)
  const [debouncedValue, setDebouncedValue] = useState(initialValue)

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay)
    return () => clearTimeout(handler)
  }, [value, delay])

  return {
    value,
    debouncedValue,
    onChange: (e) => setValue(e.target.value),
  }
}
