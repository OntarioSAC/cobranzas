import React, { useState } from 'react';
import { BrowserRouter, Route, Routes, Outlet, useLocation } from 'react-router-dom';
import Home from './views/home';
import Projects from './views/projects';
import ClientInformation from './views/client_information';
import Sidebar from './components/sidebar';
import Navbar from './components/navbar';
import Login from './views/login';
import ForgotPassword from './views/forgot_password';
import ClientReserved from './views/client_reserved';
import ResetPassword from './views/reset_password';

// Memorizar el Sidebar para que no se vuelva a renderizar cuando se cambia de ruta
const MemoizedSidebar = React.memo(Sidebar);

const Layout = () => {
  const location = useLocation();

  const [isSidebarMinimized, setIsSidebarMinimized] = useState(false);

  // Función para alternar el estado de minimización del sidebar
  const toggleSidebar = () => {
    setIsSidebarMinimized((prevState) => !prevState);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      {/* Navbar siempre visible excepto en la ruta de login */}
      {location.pathname !== '/login' && <Navbar toggleSidebar={toggleSidebar} />}

      <div style={{ display: 'flex', flexGrow: 1 }}>
        {/* Sidebar siempre visible excepto en la ruta de login */}
        {location.pathname !== '/login' && (
          <MemoizedSidebar isMinimized={isSidebarMinimized} />
        )}

        {/* Contenido principal con scroll propio */}
        <div
          style={{
            flexGrow: 1,
            marginTop: '60px', // Ajusta el margen superior para empujar el contenido debajo del navbar
            marginLeft: isSidebarMinimized ? '100px' : '300px',
            transition: 'margin-left 0.3s ease',
            height: 'calc(100vh - 60px)', // Asegura que el contenedor ocupe la pantalla menos el navbar
            overflowY: 'auto', // Habilita scroll solo si el contenido excede el espacio disponible
            boxSizing: 'border-box', // Asegura que el padding no afecte el tamaño total
          }}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas que usan el Layout */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/proyectos" element={<Projects />} />
          <Route path="/clientes/informacion" element={<ClientInformation />} />
          <Route path="/formulario-cliente-reservacion" element={<ClientReserved />} />
          <Route path="*" element={<h1>Not found!</h1>} />
        </Route>

        {/* Ruta de login que no usa el Layout */}
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
