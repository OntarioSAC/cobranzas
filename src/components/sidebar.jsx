import React, { useState, useEffect } from 'react';
import { FaChevronDown, FaChevronRight } from 'react-icons/fa';
import { useLocation } from 'react-router-dom'; 
import Logo from '../components/logo.jsx'; // Importar el componente memoizado del logo

const Sidebar = () => {
  const location = useLocation(); // Hook para obtener la ubicación actual
  const [hoveredItem, setHoveredItem] = useState(null);
  const [isClientesOpen, setIsClientesOpen] = useState(false); // Estado para controlar el despliegue del submenú

  // Abrir el submenú "Clientes" automáticamente si estamos en una ruta relacionada con "Clientes"
  useEffect(() => {
    if (location.pathname.startsWith('/clientes')) {
      setIsClientesOpen(true); // Mantener el submenú abierto
    }
  }, [location.pathname]);

  const sidebarStyle = {
    height: '100vh',
    width: '200px',
    backgroundColor: '#1c284c',
    position: 'fixed',
    top: 0,
    left: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'start',
    alignItems: 'center', // Centrar el contenido del sidebar
  };

  const ulStyle = {
    listStyleType: 'none',
    padding: 0,
    margin: 0,
    width: '100%', // Para que los enlaces ocupen todo el ancho del sidebar
  };

  const linkStyle = (isHovered, isActive) => ({
    display: 'block',
    padding: '10px 20px',
    backgroundColor: isActive ? '#cbf000' : isHovered ? '#cbf000' : 'transparent',
    color: isHovered || isActive ? 'black' : 'white',
    textDecoration: 'none',
    transition: 'background-color 0.3s ease, color 0.3s ease',
    position: 'relative',
  });

  const arrowStyle = {
    position: 'absolute',
    right: '20px',
    fontSize: '12px',
    marginTop: '5px',
  };

  const subMenuStyle = {
    listStyleType: 'none',
    paddingLeft: '0px',
    margin: 0,
  };

  const subLinkStyle = (isHovered, isActive) => ({
    display: 'block',
    padding: '8px 20px',
    backgroundColor: isActive ? '#cbf000' : isHovered ? '#cbf000' : 'transparent',
    color: isHovered || isActive ? 'black' : 'white',
    textDecoration: 'none',
    transition: 'background-color 0.3s ease, color 0.3s ease',
  });

  return (
    <div style={sidebarStyle}>
      {/* Utiliza el logo memoizado */}
      <Logo />
      <ul style={ulStyle}>
        <li
          onMouseEnter={() => setHoveredItem('home')}
          onMouseLeave={() => setHoveredItem(null)}
        >
          <a 
            href="/" 
            style={linkStyle(hoveredItem === 'home', location.pathname === '/')} // Marcar activo si está en home
          >
            Home
          </a>
        </li>
        <li
          onMouseEnter={() => setHoveredItem('clientes')}
          onMouseLeave={() => setHoveredItem(null)}
          onClick={() => setIsClientesOpen(!isClientesOpen)} // Cambia el estado para abrir/cerrar el submenú
        >
          <a 
            href="#!" 
            style={linkStyle(hoveredItem === 'clientes', false)} // "Clientes" nunca estará activo (sin color verde)
          >
            Clientes
            <span style={arrowStyle}>
              {isClientesOpen ? <FaChevronDown /> : <FaChevronRight />} {/* Icono dinámico */}
            </span>
          </a>
        </li>

        {/* Submenú para Clientes */}
        {isClientesOpen && (
          <ul style={subMenuStyle}>
            <li
              onMouseEnter={() => setHoveredItem('clientesPorCobrar')}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <a 
                href="/clientes/informacion" 
                style={subLinkStyle(hoveredItem === 'clientesPorCobrar', location.pathname === '/clientes/informacion')}
              >
                Clientes por cobrar
              </a>
            </li>
            <li
              onMouseEnter={() => setHoveredItem('clientesResueltos')}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <a 
                href="/clientes/resueltos" 
                style={subLinkStyle(hoveredItem === 'clientesResueltos', location.pathname === '/clientes/resueltos')}
              >
                Clientes resueltos
              </a>
            </li>
          </ul>
        )}
        <li
          onMouseEnter={() => setHoveredItem('proyectos')}
          onMouseLeave={() => setHoveredItem(null)}
        >
          <a 
            href="/proyectos" 
            style={linkStyle(hoveredItem === 'proyectos', location.pathname === '/proyectos')}
          >
            Proyectos
          </a>
        </li>
      </ul>
    </div>
  );
};

export default React.memo(Sidebar);
