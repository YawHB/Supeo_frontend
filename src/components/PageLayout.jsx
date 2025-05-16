import { useState } from 'react'
import NavBar from './navbar/NavBar.jsx'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import SideBar from './sidebar/SideBar.jsx'

const PageLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const navItems = useSelector((state) => state.user.topNavItems)

  return (
    <div className='d-flex'>
      <SideBar
        sideBarItems={navItems}
        isSideBarCollapsed={isCollapsed}
        toggleSideBarCollapse={() => setIsCollapsed(!isCollapsed)}
      />
      <div className='flex-grow-1'>
        <NavBar />
        <div className='p-3'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default PageLayout
