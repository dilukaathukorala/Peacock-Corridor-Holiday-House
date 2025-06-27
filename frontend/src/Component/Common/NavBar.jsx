import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../CSS/NavBar.css';

function Navbar() {
  const location = useLocation();

  return (
    <nav className="navbar">
      <ul className="nav-links">
        <li>
          <Link
            to="/stock-management"
            className={location.pathname === '/stock-management' ? 'active' : ''}
          >
            Stock Management
          </Link>
        </li>
        <li>
          <Link
            to="/supplier-connection" // This will navigate to the SupplierConnection component
            className={location.pathname === '/supplier-connection' ? 'active' : ''}
          >
            Supplier Connection
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
