import React from 'react';
import { BrowserRouter, Route, Routes, Outlet } from 'react-router-dom'; // Importar Outlet y BrowserRouter
import Home from './views/home';
import Projects from './views/projects';
import ClientInformation from './views/client_information';
import Sidebar from './components/sidebar'; // Importar el Sidebar

// Memorizar el Sidebar para que no se vuelva a renderizar cuando se cambia de ruta
const MemoizedSidebar = React.memo(Sidebar);

const Layout = () => {
 

  const contentStyle = {
    flexGrow: 1, // El contenido principal ocupará el espacio restante
    padding: '20px', // Añade padding alrededor del contenido
  };

  return (
    <BrowserRouter>
      <div >
        {/* Sidebar estático, solo se renderiza una vez */}
        <MemoizedSidebar />

        {/* Contenido que cambia dinámicamente */}
        <div style={contentStyle}>
          <Routes>
            <Route path="/" element={<LayoutWithOutlet />}>
              <Route index element={<Home />} />
              <Route path="/proyectos" element={<Projects />} />
              <Route path="/clientes/informacion" element={<ClientInformation />} />
              <Route path="*" element={<h1>Not found!</h1>} />
            </Route>
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

// Componente envolvente que usa Outlet para renderizar el contenido dinámico
const LayoutWithOutlet = () => {
  return (
    <div>
      <Outlet /> {/* Aquí se renderizan los componentes hijos */}
    </div>
  );
};

export default Layout;
