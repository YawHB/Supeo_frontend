import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button, Nav, NavItem } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDoubleLeft,
  faAngleDoubleRight,
} from "@fortawesome/free-solid-svg-icons";

const SideBar = ({
  sideBarItems,
  isSideBarCollapsed,
  toggleSideBarCollapse,
}) => {
  const [translate] = useTranslation("global");

  return (
    <div className="d-flex flex-column bg-sidebar justify-content-between px-4 sticky-top vh-100 top-0">
      <Nav vertical className="d-flex flex-column">
        {sideBarItems.map((item, index) => (
          <NavItem key={index}>
            <NavLink
              to={item.link}
              style={{ color: "inherit" }}
              className="d-flex gap-2 align-items-center p-1"
            >
              <div
                style={{ width: "2rem", height: "2rem" }}
                className="d-flex justify-content-center align-items-center text-light"
              >
                <FontAwesomeIcon icon={item.icon} />
              </div>
              {!isSideBarCollapsed && (
                <h6 className="text-light m-0">{translate(item.label)}</h6>
              )}
            </NavLink>
          </NavItem>
        ))}
      </Nav>

      <div className="sticky-bottom bottom-0 py-3">
        <Button
          color="primary"
          style={{ height: "2.5rem" }}
          onClick={toggleSideBarCollapse}
          className="d-flex gap-2 justify-content-center align-items-center justify-self-end w-100"
        >
          <FontAwesomeIcon
            icon={isSideBarCollapsed ? faAngleDoubleRight : faAngleDoubleLeft}
          />
          {!isSideBarCollapsed && <span>{translate("minimize")}</span>}
        </Button>
      </div>
    </div>
  );
};

export default SideBar;
