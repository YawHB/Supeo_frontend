import { Nav, NavItem } from "reactstrap";

const SideBar = ({ sideBarItems }) => {
  return (
    <Nav vertical className="d-flex flex-column">
      {sideBarItems.map((item, index) => (
        <NavItem key={index}></NavItem>
      ))}
    </Nav>
  );
};

export default SideBar;
