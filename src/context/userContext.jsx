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

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Error al iniciar sesión.');
        }

        // Almacenar el token en localStorage y en el estado
        localStorage.setItem('token', data.token);
        setToken(data.token);
        setUser(data); // Guarda toda la información recibida

        // Limpiar cualquier error previo
        setError(null);

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


  // Función para solicitar el restablecimiento de contraseña
  const requestPasswordReset = useCallback(async (email) => {
    try {
      const response = await fetch('http://100.42.184.197/api/v1/password-reset/request/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error al enviar el correo de recuperación.');
      }

      console.log('Correo de recuperación enviado:', data);
      // Puedes manejar cualquier estado adicional aquí

    } catch (error) {
      console.error('Error al enviar el correo de recuperación:', error);
      throw error; // Re-lanzar el error para que el componente lo maneje
    }
  }, []);


  // Función para confirmar el restablecimiento de contraseña
  const confirmPasswordReset = useCallback(async (resetToken, newPassword, confirmPassword) => {
    try {
      const response = await fetch(`http://100.42.184.197/api/v1/password-reset/confirm/${resetToken}/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          new_password: newPassword,
          confirm_password: confirmPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error al restablecer la contraseña.');
      }

      console.log('Contraseña actualizada correctamente.');
      // Maneja cualquier estado adicional si es necesario

    } catch (error) {
      console.error('Error al restablecer la contraseña:', error);
      throw error; // Re-lanzar el error para que el componente lo maneje
    }
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
        requestPasswordReset, 
        confirmPasswordReset, 
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;