import React from 'react';
import { NavLink } from 'react-router-dom';

const Menu = () => {
    return (
        <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
            <div className="position-sticky pt-3 sidebar-sticky">
            <ul className="nav flex-column">
                <li className="nav-item">
                {/* NavLink works like `link` but highlights the active Link */}
                {/* You can define what class to apply to the link when active using the `className` attribute */}
                <NavLink end to={'/'} className="nav-link">
                    <span data-feather="home" className="align-text-bottom"></span>
                    Dashboard
                </NavLink>
                </li>
                <li className="nav-item">
                <NavLink to={'/users'} className="nav-link">
                    <span data-feather="home" className="align-text-bottom"></span>
                    Users
                </NavLink>
                </li>
            </ul>
            </div>
        </nav>
    )
}

export default Menu;