import { useState, useEffect } from 'react'

export const useInput = (initialValue = '', delay = 300) => {

  const [value, setValue] = useState(initialValue)
  const [debouncedValue, setDebouncedValue] = useState(initialValue)
  const onChange = (eOrValue) => {
    if (eOrValue && eOrValue.target !== undefined) {
      setValue(eOrValue.target.value)
    } else {
      setValue(eOrValue)
    }
  }

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => clearTimeout(handler)
  }, [value, delay])

  return {
    value,
    onChange,
    setValue,
    debouncedValue,
  }
}
