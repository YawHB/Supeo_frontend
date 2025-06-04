import Logo from '../../assets/Logo.jsx'
import { Nav, Navbar, NavItem, Collapse, Button, NavLink, NavbarBrand, NavbarToggler } from 'reactstrap'
import { Link } from 'react-router-dom'
import useNavBarState from './NavBarState'
import { Fragment } from 'react/jsx-runtime'
import { faSignOut, faHouse } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useContext } from 'react'
import { AuthContext } from '../context/authContext.js'
import { useTranslation } from 'react-i18next'

const NavBar = () => {
  const { logOff, navItems, isBurgerCollapsed, toggleBurgerCollapsed } = useNavBarState()
  const { user } = useContext(AuthContext)
  const [translate] = useTranslation('global')

  return (
    <>
      <Navbar dark expand='md' className='bg-sidebar'>
        <NavbarBrand tag={Link} to='/'>
          <Logo
            className='px-3'
            text=''
            logoColor='#E0FDAD'
            textColor='#FCFFFF'
            imgStyle={{ height: `1.75rem` }}
            textStyle={{ fontSize: `2rem`, fontWeight: `600` }}
          />
        </NavbarBrand>
        <NavbarToggler onClick={toggleBurgerCollapsed} className='me-3' />
        <Collapse isOpen={!isBurgerCollapsed} navbar>
          <div className='w-100 d-flex justify-content-md-end justify-content-center'>
            <Nav navbar className='flex-column align-items-center flex-md-row gap-3'>
              <NavItem>
                <NavLink tag={Link} to='/' className='text-light'>
                  <FontAwesomeIcon icon={faHouse} size='xl' />
                </NavLink>
              </NavItem>

              {navItems.map((item) => (
                <Fragment key={item.label}>
                  <NavItem>
                    <NavLink tag={Link} to={item.link} className='text-light'>
                      <FontAwesomeIcon icon={item.icon} size='xl' />
                    </NavLink>
                  </NavItem>
                </Fragment>
              ))}

              <NavItem
                className='d-none d-md-block mx-2 bg-light'
                style={{ width: '1px', height: '24px' }}
              />
              <Button onClick={logOff} color='default' className='text-light'>
                <FontAwesomeIcon size='xl' className='icon pe-2' icon={faSignOut} />
                {translate('logout.logout')}
                {user?.email ? ` (${user.email})` : ''}
              </Button>
            </Nav>
          </div>
        </Collapse>
      </Navbar>
    </>
  )
}

export default NavBar
