import { useSelector } from 'react-redux'
import { useCallback, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const useNavBarState = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [userFullName, setUserFullName] = useState('')
  const navItems = useSelector(({ user }) => user.topNavItems)
  const [isBurgerCollapsed, setIsBurgerCollapsed] = useState(true)
  const user = useSelector((state) => state.auth.authenticatedUser)

  const toggleBurgerCollapsed = () => {
    setIsBurgerCollapsed(!isBurgerCollapsed)
  }

  useEffect(() => {
    if (!user) {
      setUserFullName(``)
    }
    setUserFullName(`${user?.firstName} ${user?.lastName}`)
  }, [user])

  const isActiveFunction = useCallback(
    (item) => {
      const getModuleRegex = /^(\/[^/]*)/
      const locationModule = getModuleRegex.exec(location.pathname)?.[1] ?? ''
      return item.link === locationModule
    },
    [navItems, location],
  )

  const logOff = () => {
    navigate('logging-out')
  }

  const outsideClickFunction = () => {
    setIsBurgerCollapsed(true)
  }

  return {
    user,
    logOff,
    location,
    navigate,
    navItems,
    userFullName,
    setUserFullName,
    isActiveFunction,
    isBurgerCollapsed,
    setIsBurgerCollapsed,
    outsideClickFunction,
    toggleBurgerCollapsed,
  }
}

export default useNavBarState
