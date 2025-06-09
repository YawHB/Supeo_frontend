import { AuthContext } from './authContext.js'
import { useState } from 'react'
import { jwtDecode } from 'jwt-decode'
import { useNavigate } from 'react-router-dom'

function decodeToken(token) {
  if (token) {
    const deccodedToken = jwtDecode(token)

    if (deccodedToken.exp * 1000 > Date.now()) {
      return deccodedToken
    } else {
      localStorage.removeItem('token')
    }
  }
  return null
}

export function AuthProvider({ children }) {
  const navigate = useNavigate()

  const [user, setUser] = useState(() => {
    const token = localStorage.getItem('token')
    return decodeToken(token)
  })


  function login(userData) {
    localStorage.setItem('token', userData)
    const decodedUser = decodeToken(userData)
    setUser(decodedUser)
  }

  function logout() {
    localStorage.removeItem('token')
    navigate('/')
    setUser(null)
  }

  function isAuthenticated() {
    const token = localStorage.getItem('token')
    const decoded = decodeToken(token)
    return !!decoded
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  )
}
