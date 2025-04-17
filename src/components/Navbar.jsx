import { NavLink } from 'react-router-dom';

export default function Navbar() {
    return (
        <div>
            <NavLink className="NavLink" to="/employee">
                Employee Homepage
            </NavLink>
            <NavLink className="NavLink" to="/admin">
                Admin Homepage
            </NavLink>
        </div>
    );
}
