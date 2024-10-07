import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faSearch } from '@fortawesome/free-solid-svg-icons';
import '../styles/Menu.css'

const Navbar = ({ toggleSidebar }) => {
    return (
        <nav className="navbar">
            <div className="navbar-left">
                <button onClick={toggleSidebar} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                    <FontAwesomeIcon icon={faBars} size="lg" />
                </button>
            </div>
            <div className="navbar-center">
                <div className="search-bar">
                    <FontAwesomeIcon icon={faSearch} />
                    <input type="text" placeholder="Buscar colaboradores (Ctrl + B)" />
                </div>
            </div>
            <div className="navbar-right">
              
                <div className="profile">
                    <img src="/path-to-profile-img" alt="User" />
                    <p>CR. Briceño</p>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
