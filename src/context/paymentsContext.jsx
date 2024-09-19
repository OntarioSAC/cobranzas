import React, { createContext, useState } from "react";

// Crear el contexto para los pagos
export const PaymentsContext = createContext();

const PaymentsProvider = ({ children }) => {
    const [payments, setPayments] = useState([]);

    // Función para cargar los pagos desde la API
    const loadPayments = async (clientId) => {
        try {
            const response = await fetch(`http://100.42.184.197/api/v1/get_cronograma_pagos/${clientId}`);
            if (!response.ok) {
                throw new Error(`Error al cargar los pagos: ${response.statusText}`);
            }
            const data = await response.json();
            setPayments(data);
        } catch (error) {
            console.error("Error al cargar los pagos:", error);
        }
    };

    // Función para actualizar un pago
    const updatePayment = (paymentId, updatedData) => {
        setPayments(prevPayments =>
            prevPayments.map(payment =>
                payment.id === paymentId ? { ...payment, ...updatedData } : payment
            )
        );
        // Aquí puedes hacer una llamada a la API si necesitas actualizar los datos en el servidor
    };

    return (
        <PaymentsContext.Provider value={{ payments, loadPayments, updatePayment }}>
            {children}
        </PaymentsContext.Provider>
    );
};

export default PaymentsProvider;
