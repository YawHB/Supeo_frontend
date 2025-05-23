import { useState } from 'react'

export const useInput = (initialValue = '') => {
  // const [value, setValue] = useState(initialValue)
  // const onChange = (e) => {setValue(e.target.value)}

  const [value, setValue] = useState(initialValue)
  const onChange = (eOrValue) => {
    // håndterer både react-select og native inputs.
    if (eOrValue && eOrValue.target !== undefined) {
      setValue(eOrValue.target.value)
    } else {
      setValue(eOrValue)
    }
  }

  return {
    value,
    onChange,
    setValue,
  }
}
