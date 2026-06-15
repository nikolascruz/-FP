import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navigation.css';

function Navigation() {
    const location = useLocation();
    return (
        <nav>
            <ul>
                <li className={location.pathname === "/" ? "active" : ""}>
                    <Link to="/">Home</Link>
                </li>
                <li className={location.pathname === "/list" ? "active" : ""}>
                    <Link to="/list">Cartões Postais</Link>
                </li>
                <li className={location.pathname === "/postcard/:id" ? "active" : ""}>
                    <Link to="/postcard/:id">Cartão Postal</Link>
                </li>
            </ul>
        </nav>
    );
}

export default Navigation;