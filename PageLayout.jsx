import { useState } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import NavBar from "./src/components/navbar/NavBar.jsx";
import SideBar from "./src/components/sidebar/SideBar.jsx";

const PageLayout = () => {
  const navItems = useSelector((state) => state.user.topNavItems);
  const [isCollapsed, setIsCollapsed] = useState(false);
  return (
    <div className="d-flex">
      <SideBar
        sideBarItems={navItems}
        isSideBarCollapsed={isCollapsed}
        toggleSideBarCollapse={() => setIsCollapsed(!isCollapsed)}
      />
      <div className="flex-grow-1">
        <NavBar />
        <div className="p-3">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default PageLayout;
