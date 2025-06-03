import { createContext } from 'react'

export const AuthContext = createContext({
  user: null,
  // eslint-disable-next-line no-unused-vars
  login: (userData) => {},
  logout: () => {},
  isAuthenticated: () => {},
})
