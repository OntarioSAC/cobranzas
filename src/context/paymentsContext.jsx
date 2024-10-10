import React, { createContext, useState, useCallback } from "react";

// Crear el contexto para los pagos
export const PaymentsContext = createContext();

const PaymentsProvider = ({ children }) => {
  const [payments, setPayments] = useState({}); // Inicializamos como un objeto vacío en lugar de un array
  const [clientId, setClientId] = useState(null); // Guardamos el clientId global
  const [boletaCode, setBoletaCode] = useState(''); // Estado para almacenar el código generado por el backend

  // Función para cargar los pagos desde la API, usando el clientId global
  const loadPayments = useCallback(async () => {
    try {
      console.log("Cargando pagos para clientId:", clientId);
      const response = await fetch(`http://100.42.184.197/api/v1/get_cronograma_pagos/${clientId}`);
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
  }, [clientId]);

  // Función para generar el código de boleta desde la API
  const generateBoletaCode = useCallback(async () => {
    try {
      const response = await fetch('http://100.42.184.197/api/v1/generate_boleta_code/');
      if (!response.ok) {
        throw new Error(`Error al generar el código de boleta: ${response.statusText}`);
      }
      const data = await response.json();
      setBoletaCode(data.codigo); // Suponiendo que el backend retorna un objeto con el campo "codigo"
      console.log("Código de boleta generado:", data.codigo);
    } catch (error) {
      console.error("Error al generar el código de boleta:", error);
    }
  }, []);

  // Función para actualizar una cuota específica de un cliente
  const updatePayment = async (cuotaId, updatedData) => {
    try {
      if (!clientId) {
        throw new Error("El clientId no está definido");
      }
      console.log("Actualizando cuotaId:", cuotaId, "para clientId:", clientId);
      const response = await fetch(`http://100.42.184.197/api/v1/update_morosidad/${clientId}/${cuotaId}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        throw new Error(`Error al actualizar el pago: ${response.statusText}`);
      }

      const updatedPayment = await response.json();
      console.log("Pago actualizado:", updatedPayment);

      setPayments((prevPayments) => ({
        ...prevPayments,
        cuotas: prevPayments.cuotas.map(payment =>
          payment.id_cuota === cuotaId ? { ...payment, ...updatedPayment } : payment
        )
      }));
    } catch (error) {
      console.error("Error al actualizar el pago:", error);
    }
  };

  return (
    <PaymentsContext.Provider value={{ payments, loadPayments, updatePayment, setClientId, boletaCode, generateBoletaCode }}>
      {children}
    </PaymentsContext.Provider>
  );
};

export default PaymentsProvider;
