import React, { useState, useContext } from 'react';
import { BrowserRouter, Route, Routes, Outlet } from 'react-router-dom';
import Home from './views/home';
import Projects from './views/projects';
import ClientInformation from './views/client_information';
import Sidebar from './components/sidebar';
import Navbar from './components/navbar';
import Login from './views/login';
import ForgotPassword from './views/forgot_password';
import ClientReserved from './views/client_reserved';
import PrivateRoute from './controllers/privateRoutes.jsx'; // Importa PrivateRoute
import { UserContext } from './context/userContext'; // Importa UserContext si es necesario
import ResetPassword from './views/reset_password';

// Memorizar el Sidebar para que no se vuelva a renderizar cuando se cambia de ruta
const MemoizedSidebar = React.memo(Sidebar);

const Layout = () => {
  const { token } = useContext(UserContext); // Obtén el token del contexto

  const [isSidebarMinimized, setIsSidebarMinimized] = useState(false);

  // Función para alternar el estado de minimización del sidebar
  const toggleSidebar = () => {
    setIsSidebarMinimized((prevState) => !prevState);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      {/* Navbar visible solo si el usuario está autenticado */}
      {token && <Navbar toggleSidebar={toggleSidebar} />}

      <div style={{ display: 'flex', flexGrow: 1 }}>
        {/* Sidebar visible solo si el usuario está autenticado */}
        {token && <MemoizedSidebar isMinimized={isSidebarMinimized} />}

        {/* Contenido principal con scroll propio */}
        <div
          style={{
            flexGrow: 1,
            marginTop: token ? '60px' : '0',
            marginLeft: token ? (isSidebarMinimized ? '100px' : '300px') : '0',
            transition: 'margin-left 0.3s ease',
            height: token ? 'calc(100vh - 60px)' : '100vh',
            overflowY: 'auto',
            boxSizing: 'border-box',
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
          {/* Rutas protegidas */}
          <Route
            index
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="proyectos"
            element={
              <PrivateRoute>
                <Projects />
              </PrivateRoute>
            }
          />
          <Route
            path="clientes/informacion"
            element={
              <PrivateRoute>
                <ClientInformation />
              </PrivateRoute>
            }
          />
          <Route
            path="formulario-cliente-reservacion"
            element={
              <PrivateRoute>
                <ClientReserved />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<h1>Not found!</h1>} />
        </Route>

        {/* Rutas públicas */}
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;