import { AuthContext } from './authContext.js'
import { useState } from 'react'
import { jwtDecode } from 'jwt-decode'
import { useNavigate } from 'react-router-dom'

/*Eksempel på decoded token
  {
  "user_id": 10,
  "email": "finn_olsen@gmail.com",
  "roleName": "Togkontrollør",
  "permissionLevel": "Member"
  "iat": 1746391201,
  "exp": 1746398401
}
 */
function decodeToken(token) {
  if (token) {
    const deccodedToken = jwtDecode(token)
    console.log('Decoded token: ', deccodedToken)

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

  console.log('Initial user:', user)

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

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>
}
