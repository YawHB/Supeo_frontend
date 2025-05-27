import { useState, useEffect } from 'react'

export const useInput = (initialValue = '', delay = 300) => {
  // const [value, setValue] = useState(initialValue)
  // const onChange = (e) => {setValue(e.target.value)}

  const [value, setValue] = useState(initialValue)
  const [debounced, setDebounced] = useState(value)
  const onChange = (eOrValue) => {
    // håndterer både react-select og native inputs.
    if (eOrValue && eOrValue.target !== undefined) {
      setValue(eOrValue.target.value)
    } else {
      setValue(eOrValue)
    }
  }
  
    useEffect(() => {
      const handler = setTimeout(() => setDebounced(value), delay)
      return () => clearTimeout(handler)
    }, [value, delay])

  return {
    value,
    onChange,
    setValue,
    debounced,
  }
}
