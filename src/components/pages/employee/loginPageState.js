import { LOGIN_USER } from '../../../services/employee/mutations'
import { useMutation } from '@apollo/client'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/authContext.js'
import { useContext } from 'react'
import { useForm } from '../../../hooks/useForm.js'
import { useState, useEffect } from 'react'

export const useLoginPageState = () => {
  const context = useContext(AuthContext)
  const [translate] = useTranslation('global')
  const [emailPlaceholder, setEmailPlaceholder] = useState(translate('login.email'))
  const [passwordPlaceholder, setPasswordPlaceholder] = useState(translate('login.password'))
  const [showPassword, setShowPassword] = useState(false)
  const [emailEscapePressedOnce, setEmailEscapePressedOnce] = useState(false)
  const [passwordEscapePressedOnce, setPasswordEscapePressedOnce] = useState(false)

  const [rememberMe, setRememberMe] = useState(false)

  let navigate = useNavigate()
  const [errors, setErrors] = useState(null)

  const { onChange, values, setValues } = useForm(handleLoginSubmitCallBack, {
    email: '',
    password: '',
  })

  const [handleEmployeeLogin] = useMutation(LOGIN_USER)

  // Load saved email from localStorage on mount
  useEffect(() => {
    const savedEmail = localStorage.getItem('rememberedEmail')
    if (savedEmail) {
      setValues((vals) => ({ ...vals, email: savedEmail }))
      setRememberMe(true)
    }
  }, [setValues])

  function handleLoginSubmitCallBack() {
    handleEmployeeLogin({
      variables: {
        loginInput: values,
      },
      onCompleted: (data) => {
        const userData = data.handleEmployeeLogin
        console.log('userData: ', userData.token)
        context.login(userData.token)
      },
      onError: ({ graphQLErrors }) => {
        setErrors(graphQLErrors)
      },
    })
  }

  // håndterer remember me knappen og putter det i localstorage
  const onSubmit = (e) => {
    e.preventDefault()
    if (rememberMe) {
      localStorage.setItem('rememberedEmail', values.email)
    } else {
      localStorage.removeItem('rememberedEmail')
    }
    handleLoginSubmitCallBack()
  }

  useEffect(() => {
    if (context.user) {
      const role = context.user.permissionLevel

      if (role === 'Member') {
        navigate('/employee/time-entries')
      } else if (role === 'Admin' || role === 'Manager') {
        navigate('/admin/time-entries')
      } else {
        navigate('/')
      }

      console.log('context.user:', context.user)
    }
  }, [context.user, navigate])

  return {
    translate,
    navigate,
    handleLoginSubmitCallBack,
    values,
    onChange,
    onSubmit,
    errors,
    setErrors,
    emailPlaceholder,
    setEmailPlaceholder,
    passwordPlaceholder,
    setPasswordPlaceholder,
    showPassword,
    setShowPassword,
    rememberMe,
    setRememberMe,
    emailEscapePressedOnce,
    setEmailEscapePressedOnce,
    passwordEscapePressedOnce,
    setPasswordEscapePressedOnce,
  }
}
