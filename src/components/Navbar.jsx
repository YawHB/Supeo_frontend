import { NavLink } from 'react-router-dom';
import { Row, Col } from 'reactstrap';

export default function Navbar() {
    return (
      <div>
        <Row>
          <Col>
            <NavLink className="NavLink" to="/admin">
              Admin Homepage
            </NavLink>
          </Col>
            <NavLink className="NavLink" to="/employees">
              Employees Page
            </NavLink>
        </Row>
        <Row>
          <Col>
            <NavLink className="NavLink" to="/employee">
              Employee Homepage
            </NavLink>
          </Col>
        </Row>
      </div>
    );
}
