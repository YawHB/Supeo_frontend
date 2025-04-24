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
    <div className="d-flex flex-column bg-dark justify-content-between px-4 sticky-top vh-100 top-0">
      <Nav vertical className="d-flex flex-column">
        {sideBarItems.map((item, index) => (
          <NavItem key={index}>
            <NavLink
              to={item.link}
              className="d-flex gap-2 align-items-center p-1 text-decoration-none"
              style={{ color: "inherit" }}
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

      <div className="mt-auto py-3">
        <Button
          onClick={toggleSideBarCollapse}
          color="primary"
          className="d-flex gap-2 justify-content-center align-items-center w-100"
          style={{ width: "2.5rem" }}
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
