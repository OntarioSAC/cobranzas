import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faFileAlt,
  faUserAlt,
  faAddressBook,
  faClipboard,
  faProjectDiagram,
  faUsers,
  faUserCog // Icono para Staff
} from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';
import logo from '../assests/img/logo.png';
import logosmall from '../assests/img/logosmall.png';
import '../styles/Menu.css';

const Sidebar = ({ isMinimized }) => {
  const [isClientsExpanded, setIsClientsExpanded] = useState(false);

  const sidebarStyle = {
    height: 'calc(100vh - 60px)',
    width: isMinimized ? '85px' : '270px',
    backgroundColor: '#f3f1eb',
    position: 'fixed',
    top: '60px',
    left: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    transition: 'width 0.3s ease',
    overflowY: 'auto',
  };

  const liStyle = {
    padding: '13px',
    alignItems: 'center',
    color: '#1c284c',
    cursor: 'default',
  };

  const toggleClientsMenu = () => {
    setIsClientsExpanded(!isClientsExpanded);
  };

  return (
    <div style={sidebarStyle}>
      <div className="sidebar-logo">
        <img
          src={isMinimized ? logosmall : logo}
          alt="Logo"
          style={{ width: isMinimized ? '40px' : '150px', marginBottom: '10px' }}
        />
      </div>

      <ul className="sidebar-nav" style={{ listStyle: 'none', padding: 0, width: '100%' }}>
        <li style={liStyle}>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? 'sidebar-link active' : 'sidebar-link')}
            style={{ textDecoration: 'none', width: '100%' }}
          >
            <FontAwesomeIcon icon={faHome} style={{ marginRight: '10px' }} />
            {!isMinimized && <span>Inicio</span>}
          </NavLink>
        </li>

        <li style={liStyle}>
          <NavLink
            to="/proyectos"
            className={({ isActive }) => (isActive ? 'sidebar-link active' : 'sidebar-link')}
            style={{ textDecoration: 'none', width: '100%' }}
          >
            <FontAwesomeIcon icon={faProjectDiagram} style={{ marginRight: '10px' }} />
            {!isMinimized && <span>Proyectos</span>}
          </NavLink>
        </li>

        {/* Grupo de Clientes */}
        <li style={{ ...liStyle, cursor: 'pointer' }} onClick={toggleClientsMenu}>
          {!isMinimized && (
            <span className="sidebar-link">
              <FontAwesomeIcon icon={faUsers} style={{ marginRight: '10px' }} />
              Clientes
            </span>
          )}
        </li>

        {isClientsExpanded && (
          <ul style={{ listStyle: 'none', paddingLeft: '20px' }}>
            <li style={liStyle}>
              <NavLink
                to="/clientes/informacion"
                className={({ isActive }) =>
                  isActive ? 'sidebar-link active' : 'sidebar-link'
                }
                style={{ textDecoration: 'none', width: '100%' }}
              >
                <FontAwesomeIcon icon={faUserAlt} style={{ marginRight: '10px' }} />
                {!isMinimized && <span>Cliente Ontario</span>}
              </NavLink>
            </li>

            <li style={liStyle}>
              <NavLink
                to="/clientes/resuelto"
                className={({ isActive }) =>
                  isActive ? 'sidebar-link active' : 'sidebar-link'
                }
                style={{ textDecoration: 'none', width: '100%' }}
              >
                <FontAwesomeIcon icon={faFileAlt} style={{ marginRight: '10px' }} />
                {!isMinimized && <span>Cliente Resuelto</span>}
              </NavLink>
            </li>

            <li style={liStyle}>
              <NavLink
                to="/clientes/separacion"
                className={({ isActive }) =>
                  isActive ? 'sidebar-link active' : 'sidebar-link'
                }
                style={{ textDecoration: 'none', width: '100%' }}
              >
                <FontAwesomeIcon icon={faAddressBook} style={{ marginRight: '10px' }} />
                {!isMinimized && <span>Cliente Separación</span>}
              </NavLink>
            </li>
          </ul>
        )}

        {/* Opción de Staff */}
        <li style={liStyle}>
          <NavLink
            to="/staff"
            className={({ isActive }) => (isActive ? 'sidebar-link active' : 'sidebar-link')}
            style={{ textDecoration: 'none', width: '100%' }}
          >
            <FontAwesomeIcon icon={faUserCog} style={{ marginRight: '10px' }} />
            {!isMinimized && <span>Staff</span>}
          </NavLink>
        </li>

        {/* Formulario Separación */}
        <li style={liStyle}>
          <NavLink
            to="/formulario-cliente-reservacion"
            className={({ isActive }) => (isActive ? 'sidebar-link active' : 'sidebar-link')}
            style={{ textDecoration: 'none', width: '100%' }}
          >
            <FontAwesomeIcon icon={faClipboard} style={{ marginRight: '10px' }} />
            {!isMinimized && <span>Formulario Separación</span>}
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
