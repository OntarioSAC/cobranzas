import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faUserCircle } from '@fortawesome/free-solid-svg-icons'; // Importamos el ícono de usuario
import '../styles/Menu.css';
import { UserContext } from '../context/userContext.jsx'; // Importa el contexto de usuario

const Navbar = ({ toggleSidebar }) => {
    const { user } = useContext(UserContext); // Obtén los datos del usuario desde el contexto

    // Función para capitalizar las palabras
    const capitalizeWords = (str) => {
        return str
            .toLowerCase()
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };

    return (
        <nav className="navbar">
            <div className="navbar-left">
                <button onClick={toggleSidebar} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                    <FontAwesomeIcon icon={faBars} size="lg" />
                </button>
            </div>
            {/* <div className="navbar-center">
                <div className="search-bar">
                    <FontAwesomeIcon icon={faSearch} />
                    <input type="text" placeholder="Buscar colaboradores (Ctrl + B)" />
                </div>
            </div> */}
            <div className="navbar-right">
                <div className="profile">
                    <FontAwesomeIcon icon={faUserCircle} size="2x" style={{ marginRight: '8px' }} /> {/* Ícono de usuario */}
                    <p>{capitalizeWords(user?.persona_staff?.nombres)} {capitalizeWords(user?.persona_staff?.apellidos)}</p>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
