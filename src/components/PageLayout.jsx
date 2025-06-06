import NavBar from './navbar/NavBar.jsx'
import { Outlet } from 'react-router-dom'
import SideBar from './sidebar/SideBar.jsx'
import useSideBarState from './sidebar/SideBarState.js'

const PageLayout = () => {
  const { sideBarItems, isSideBarCollapsed, toggleSideBarCollapse } = useSideBarState()

  return (
    <>
      <NavBar />
      <div className='page-frame'>
        <SideBar
          className='sidebar'
          sideBarItems={sideBarItems}
          isSideBarCollapsed={isSideBarCollapsed}
          toggleSideBarCollapse={toggleSideBarCollapse}
        />

        <div className='page-content'>
          <Outlet />
        </div>
      </div>
    </>
  )
}

export default PageLayout
