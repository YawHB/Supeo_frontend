import Logo from "../Logo.jsx";
import { Navbar, NavbarBrand,
} from "reactstrap";

import useNavBarState from "./NavBarState";

const NavBar = () => {
  const {
    
  } = useNavBarState();

  return (
    <>
      <Navbar>
        <NavbarBrand to="/">
         
        </NavbarBrand>
      </Navbar>
    </>
  );
};

export default NavBar;
