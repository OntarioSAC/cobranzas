// components/PrivateRoute.jsx
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../context/userContext';

const PrivateRoute = ({ children }) => {
  const { token } = useContext(UserContext);

  if (!token) {
    // Usuario no autenticado: redirige a /login
    return <Navigate to="/login" />;
  } else {
    // Usuario autenticado: renderiza los componentes hijos
    return children;
  }
};

export default PrivateRoute;
