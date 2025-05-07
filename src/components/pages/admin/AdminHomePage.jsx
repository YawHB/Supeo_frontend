import { useTranslation } from "react-i18next";
import SideBar from "../../sidebar/SideBar";
import useSideBarState from "../../sidebar/SideBarState";

const AdminHomePage = () => {
  const [translate] = useTranslation("global");
  document.title = translate("page_title.admin_home");

  const { sideBarItems, isSideBarCollapsed, toggleSideBarCollapse } =
    useSideBarState();

  return (
    <div className="d-flex">
      <div
        style={{
          width: isSideBarCollapsed ? "50px" : "250px",
          transition: "width 0.3s ease",
        }}
      >
        <SideBar
          sideBarItems={sideBarItems}
          isSideBarCollapsed={isSideBarCollapsed}
          toggleSideBarCollapse={toggleSideBarCollapse}
        />
      </div>
      <div className="flex-grow-1 p-4">
        <h1>Admin Homepage</h1>
      </div>
    </div>
  );
};

export default AdminHomePage;
