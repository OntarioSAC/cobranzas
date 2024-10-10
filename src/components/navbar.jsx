import React, { useContext, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faUserCircle, faCaretDown } from '@fortawesome/free-solid-svg-icons'; // Agregamos el ícono de la flecha
import '../styles/Menu.css';
import { UserContext } from '../context/userContext.jsx'; // Importa el contexto de usuario

const Navbar = ({ toggleSidebar }) => {
    const { user, logout } = useContext(UserContext); // Obtén los datos del usuario y la función logout desde el contexto
    const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Estado para controlar el menú desplegable

    // Función para capitalizar las palabras
    const capitalizeWords = (str) => {
        if (!str) return ''; // Verifica si el valor es undefined, null o vacío
        return str
            .toLowerCase()
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };

    // Función para alternar el menú desplegable
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
                <div className="profile" style={{ position: 'relative' }}>
                    <FontAwesomeIcon icon={faUserCircle} size="2x" style={{ marginRight: '8px' }} /> {/* Ícono de usuario */}
                    <p style={{ display: 'inline', marginRight: '8px' }}>
                        {capitalizeWords(user?.persona_staff?.nombres || 'Usuario')} {/* Valor por defecto 'Usuario' */}
                        {capitalizeWords(user?.persona_staff?.apellidos || '')}
                    </p>
                    <FontAwesomeIcon 
                        icon={faCaretDown} 
                        style={{ cursor: 'pointer' }} 
                        onClick={toggleDropdown} 
                    /> {/* Ícono de flecha */}

                    {/* Menú desplegable */}
                    {isDropdownOpen && (
                        <div className="dropdown-menu" style={{
                            position: 'absolute',
                            top: '100%',
                            right: 0,
                            backgroundColor: '#fff',
                            border: '1px solid #ccc',
                            borderRadius: '4px',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                            zIndex: 1000,
                            width: '150px'
                        }}>
                            <ul style={{ listStyleType: 'none', padding: '8px', margin: 0 }}>
                                <li style={{ padding: '8px 0', cursor: 'pointer' }}>Configuraciones</li>
                                <li 
                                    style={{ padding: '8px 0', cursor: 'pointer' }} 
                                    onClick={logout}  // Llamar a la función logout cuando se haga clic
                                >
                                    Logout
                                </li>
                            </ul>   
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
