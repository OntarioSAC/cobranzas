import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faFileAlt, faUserAlt, faAddressBook, faClipboard, faProjectDiagram } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';
import logo from '../assests/img/logo.png';
import logosmall from '../assests/img/logosmall.png';
import '../styles/Menu.css';

const Sidebar = ({ isMinimized }) => {
  const sidebarStyle = {
    height: '100vh',
    width: isMinimized ? '85px' : '270px',
    backgroundColor: '#f3f1eb',
    position: 'fixed',
    top: '60px',
    left: 0,
    paddingTop: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    transition: 'width 0.3s ease',
  };

  const liStyle = {
    padding: '13px',
    alignItems: 'center',
    color: '#1c284c',
    cursor: 'default',
  };

  return (
    <div style={sidebarStyle}>
      <div className="sidebar-logo">
        <img
          src={isMinimized ? logosmall : logo}
          alt="Logo"
          style={{ width: isMinimized ? '40px' : '150px', marginBottom:'0px' }}
        />
      </div>

      <ul className="sidebar-nav" style={{ listStyle: 'none', padding: 0 }}>
        <li style={liStyle}>
          <NavLink
            to="/"
            className={({ isActive }) => isActive ? 'sidebar-link active' : 'sidebar-link'}
          >
            <FontAwesomeIcon icon={faHome} />
            {!isMinimized && <span>Inicio</span>}
          </NavLink>
        </li>

        <li style={liStyle}>
          <NavLink
            to="/clientes/informacion"
            className={({ isActive }) => isActive ? 'sidebar-link active' : 'sidebar-link'}
          >
            <FontAwesomeIcon icon={faUserAlt} />
            {!isMinimized && <span>Cliente Ontario</span>}
          </NavLink>
        </li>

        <li style={liStyle}>
          <NavLink
            to="/proyectos"
            className={({ isActive }) => isActive ? 'sidebar-link active' : 'sidebar-link'}
          >
            <FontAwesomeIcon icon={faProjectDiagram} />
            {!isMinimized && <span>Proyectos</span>}
          </NavLink>
        </li>

        <li style={liStyle}>
          <NavLink
            to="/clientes/resuelto"
            className={({ isActive }) => isActive ? 'sidebar-link active' : 'sidebar-link'}
          >
            <FontAwesomeIcon icon={faFileAlt} />
            {!isMinimized && <span>Cliente Resuelto</span>}
          </NavLink>
        </li>

        <li style={liStyle}>
          <NavLink
            to="/clientes/separacion"
            className={({ isActive }) => isActive ? 'sidebar-link active' : 'sidebar-link'}
          >
            <FontAwesomeIcon icon={faAddressBook} />
            {!isMinimized && <span>Cliente Separación</span>}
          </NavLink>
        </li>

        <li style={liStyle}>
          <NavLink
            to="/formulario-cliente-reservacion"
            className={({ isActive }) => isActive ? 'sidebar-link active' : 'sidebar-link'}
          >
            <FontAwesomeIcon icon={faClipboard} />
            {!isMinimized && <span>Formulario Separación</span>}
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
