// src/components/Navbar.jsx
import React, { useContext, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import '../styles/Menu.css';
import { UserContext } from '../context/userContext.jsx'; // Contexto del usuario
import ProfilePhoto from './profilePhoto.jsx'; // Importamos ProfilePhoto

const Navbar = ({ toggleSidebar }) => {
    const { user, logout } = useContext(UserContext); // Accedemos al usuario desde el contexto
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const capitalizeWords = (str) => {
        if (!str) return '';
        return str
            .toLowerCase()
            .split(' ')
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <nav className="navbar">
            <div className="navbar-left">
                <button onClick={toggleSidebar} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                    <FontAwesomeIcon icon={faBars} size="lg" />
                </button>
            </div>
            <div className="navbar-right">
                <ProfilePhoto foto={user?.persona_staff?.foto} size={40} /> {/* Enviamos la foto del usuario */}
                <p style={{ display: 'inline', marginRight: '8px' }}>
                    {capitalizeWords(user?.persona_staff?.nombres || 'Usuario')} 
                    {capitalizeWords(user?.persona_staff?.apellidos || '')}
                </p>
                <FontAwesomeIcon icon={faCaretDown} style={{ cursor: 'pointer' }} onClick={toggleDropdown} />
                {isDropdownOpen && (
                    <div className="dropdown-menu" style={{ position: 'absolute', top: '100%', right: 0 }}>
                        <ul style={{ listStyleType: 'none', padding: '8px', margin: 0 }}>
                            <li style={{ padding: '8px 0', cursor: 'pointer' }}>Configuraciones</li>
                            <li style={{ padding: '8px 0', cursor: 'pointer' }} onClick={logout}>
                                Logout
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
