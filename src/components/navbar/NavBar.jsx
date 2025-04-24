import Logo from "../Logo.jsx";
import {
  Nav,
  Navbar,
  Button,
  NavLink,
  NavItem,
  Collapse,
  NavbarBrand,
  NavbarToggler,
} from "reactstrap";
import { Link } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";
import useNavBarState from "./NavBarState";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowsLeftRightToLine } from "@fortawesome/free-solid-svg-icons";

const NavBar = () => {
  const {
    isBurgerCollapsed,
    toggleBurgerCollapsed,
    navItems,
    userFullName,
    logOff,
  } = useNavBarState();

  return (
    <>
      <Navbar dark expand="md" className="bg-dark">
        <NavbarBrand tag={Link} to="/">
          <Logo
            className="px-3"
            text="flex"
            logoColor="#E0FDAD"
            textColor="#FCFFFF"
            imgStyle={{ height: `1.75rem` }}
            textStyle={{ fontSize: `2rem`, fontWeight: `600` }}
          />
        </NavbarBrand>
      </Navbar>
      <NavbarToggler onClick={toggleBurgerCollapsed} className="me-3" />
      <Collapse isOpen={!isBurgerCollapsed} navbar>
        <div className="w-100 d-flex justify-content-md-end justify-content-center">
          <Nav
            navbar
            className="flex-column align-items-center flex-md-row gap-3"
          >
            {navItems.map((item) => (
              <Fragment key={item.label}>
                <NavItem>
                  <NavLink tag={Link} to={item.link} className="text-light">
                    <FontAwesomeIcon icon={item.icon} size="xl" />
                  </NavLink>
                </NavItem>
              </Fragment>
            ))}
            <NavItem
              className="d-none d-md-block mx-2 bg -light"
              style={{ width: "1px", height: "24px" }}
            />

            <Button onClick={logOff} color="default" className="text-light">
              <FontAwesomeIcon
                icon={faArrowsLeftRightToLine}
                className="icon pe-2"
                size="xl"
              />
              <span>{userFullName}</span>
            </Button>
          </Nav>
        </div>
      </Collapse>
    </>
  );
};

export default NavBar;
