import { LOGIN_USER } from '../../../services/employee/mutations'
import { useMutation } from '@apollo/client'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/authContext'
import { useContext } from 'react'
import { useForm } from '../../../hooks/useForm.js'
import { useState } from 'react'

export const useLoginPageState = () => {
  const context = useContext(AuthContext)
  const [translate] = useTranslation('global')
  let navigate = useNavigate()
  const [errors, setErrors] = useState([])

  function handleLoginSubmitCallBack() {
    // console.log('values, ', values)
    handleEmployeeLogin({
      variables: {
        loginInput: values,
      },
      onCompleted: (data) => {
        // console.log('data: ', data)
        // console.log('data handleEmployeeLogin: ', data.handleEmployeeLogin)
        const userData = data.handleEmployeeLogin
        context.login(userData)

        const role = context.user.permissionLevel

        console.log('userData', userData)

        if (role === 'Member') {
          navigate('/employee/time-entries')
        } else if (role === 'Admin' || role === 'Manager') {
          navigate('/admin/time-entries')
        } else {
          navigate('/')
        }

        console.log('context.user :', context.user)
      },
      onError: ({ graphQLErrors }) => {
        console.log('inside GQL error')
        setErrors(graphQLErrors)
      },
    })
  }

  const { onChange, onSubmit, values } = useForm(handleLoginSubmitCallBack, {
    email: '',
    password: '',
  })

  const [handleEmployeeLogin] = useMutation(LOGIN_USER)

  return {
    translate,
    navigate,
    handleLoginSubmitCallBack,
    values,
    onChange,
    onSubmit,
    errors,
    setErrors,
  }
}
