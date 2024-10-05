import React, { createContext, useState, useCallback } from "react";

// Crear el contexto para los usuarios
export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [payments, setPayments] = useState({});
  const [clientId, setClientId] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null); // Inicializa con el token del localStorage si existe
  const [user, setUser] = useState(null); // Para almacenar los datos del usuario autenticado
  const [error, setError] = useState(null);

  // Función para autenticar al usuario
  const login = useCallback(async (username, password) => {
    try {
      const response = await fetch('http://100.42.184.197/api/v1/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error al iniciar sesión: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Datos de autenticación recibidos:", data);

      // Almacenar el token en localStorage y en el estado
      localStorage.setItem('token', data.token);
      setToken(data.token);
      setUser(data.user); // Guarda la información del usuario si viene en la respuesta

    } catch (error) {
      console.error("Error al autenticar:", error);
      setError(error.message);
    }
  }, []);

  // Función para cargar los pagos desde la API, usando el clientId y el token
  const loadPayments = useCallback(async () => {
    try {
      console.log("Cargando pagos para clientId:", clientId);
      const response = await fetch(`http://100.42.184.197/api/v1/get_cronograma_pagos/${clientId}`, {
        headers: {
          'Authorization': `Bearer ${token}`, // Añadir el token en el encabezado
        },
      });
      if (!response.ok) {
        throw new Error(`Error al cargar los pagos: ${response.statusText}`);
      }
      const data = await response.json();
      console.log("Datos recibidos desde la API:", data);

      setPayments(data);
    } catch (error) {
      console.error("Error al cargar los pagos:", error);
      setPayments({}); // En caso de error, asignamos un objeto vacío para evitar problemas
    }
  }, [clientId, token]);

  // Función para cerrar sesión (logout)
  const logout = useCallback(() => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    console.log("Sesión cerrada.");
  }, []);

  return (
    <UserContext.Provider
      value={{
        token,
        user,
        payments,
        login,
        loadPayments,
        setClientId,
        logout,
        error,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;