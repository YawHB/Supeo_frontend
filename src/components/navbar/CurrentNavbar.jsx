import { Row, Col } from 'reactstrap'
import { NavLink } from 'react-router-dom'

export default function NavBar() {
  return (
    <div>
      <Row>
        <Col>
          <NavLink className='NavLink' to='/admin/home'>
            Admin - Homepage
          </NavLink>
        </Col>
        <NavLink className='NavLink' to='/admin/employees'>
          Admin - Employees Page
        </NavLink>
        <NavLink className='NavLink' to='/admin/timeentries'>
          Admin - Time Entries Page
        </NavLink>
      </Row>
      <Row>
        <Col>
          <NavLink className='NavLink' to='/employee/home'>
            Employee - Homepage
          </NavLink>
        </Col>
        <Row>
          <Col>
            <NavLink className='NavLink' to='/employee/time-entries'>
              Employee - Time entries page
            </NavLink>
          </Col>
        </Row>
      </Row>
    </div>
  )
}
