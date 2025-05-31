import { useState } from 'react'

export const useForm = (callback, initialState = null) => {
  //Password
  //Email
  const [values, setValues] = useState(initialState)

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
    console.log(values)
    console.log(e.target)
    console.log(e.target.name)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    console.log('Calling callback:')

    callback()
  }

  return { onChange, onSubmit, values }
}
