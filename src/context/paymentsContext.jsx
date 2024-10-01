import React, { createContext, useState, useCallback } from "react";

// Crear el contexto para los pagos
export const PaymentsContext = createContext();

const PaymentsProvider = ({ children }) => {
  const [payments, setPayments] = useState({}); // Inicializamos como un objeto vacío en lugar de un array
  const [clientId, setClientId] = useState(null); // Guardamos el clientId global

  // Función para cargar los pagos desde la API, usando el clientId global
  const loadPayments = useCallback(async () => {
    try {
      console.log("Cargando pagos para clientId:", clientId);
      const response = await fetch(`http://100.42.184.197/api/v1/get_cronograma_pagos/${clientId}`);
      if (!response.ok) {
        throw new Error(`Error al cargar los pagos: ${response.statusText}`);
      }
      const data = await response.json();
      console.log("Datos recibidos desde la API:", data); // Ver los datos recibidos

      setPayments(data);
    } catch (error) {
      console.error("Error al cargar los pagos:", error);
      setPayments({}); // En caso de error, asignamos un objeto vacío para evitar problemas
    }
  }, [clientId]);

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
    <PaymentsContext.Provider value={{ payments, loadPayments, updatePayment, setClientId }}>
      {children}
    </PaymentsContext.Provider>
  );
};

export default PaymentsProvider;
