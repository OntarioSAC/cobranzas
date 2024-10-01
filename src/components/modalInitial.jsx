import React, { useState, useEffect, useRef, useContext } from 'react';
import { PaymentsContext } from '../context/paymentsContext'; // Importamos el contexto de pagos

const ModalPay = ({ show, onClose, client }) => {
  const { payments, updatePayment } = useContext(PaymentsContext); // Obtenemos los pagos y la función updatePayment desde el contexto
  const [localPayments, setLocalPayments] = useState([]);

  // Actualizamos el estado local cuando los pagos cambian
  useEffect(() => {
    if (show && payments.cuotas && payments.cuotas.length > 0) {
      setLocalPayments([...payments.cuotas]); // Asignar las cuotas a 'localPayments'
    }
  }, [payments, show]);

  const modalRef = useRef(null);

  // Función para manejar el cambio de estado de la cuota
  const handleStateChange = (index, newEstado, idCuota) => {
    setLocalPayments((prevPayments) => {
      const updatedPayments = [...prevPayments];
      updatedPayments[index].estado = newEstado;
      return updatedPayments;
    });

    // Llamada a la función updatePayment del contexto para actualizar el estado del pago en la API
    updatePayment(idCuota, { estado: newEstado }) // Pasar el idCuota y el estado actualizado
      .then(() => {
        console.log("Pago actualizado correctamente en el servidor");
      })
      .catch((error) => {
        console.error("Error al actualizar el pago en el servidor:", error);
      });
  };

  useEffect(() => {
    if (!show) return;
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div style={modalStyles.overlay}>
      <div style={modalStyles.modal} ref={modalRef}>
        <h2 style={modalStyles.title}>Cronograma de Pagos</h2>
        <h3 style={modalStyles.clientName}>Cliente: {client.nombres} {client.apellidos}</h3>
        <h3 style={modalStyles.clientName}>{client.proyecto} {client.lote}</h3>
        
        {/* Aquí se muestra la información adicional del cliente */}
        <div style={modalStyles.clientInfo}>
          <p><strong>Tipo de Cuota Inicial:</strong> {payments.tipo_cuota_inicial}</p>
          <p><strong>Precio de Venta en Dólares:</strong> $ {payments.precio_venta_dolares}</p>
          <p><strong>Precio de Venta en Soles:</strong> S/. {payments.precio_venta_soles}</p>
          <p><strong>Tipo de Cambio:</strong> {payments.tipo_cambio}</p>
          <p><strong>Fecha de pago:</strong> {payments.fecha_pago_cuota}</p>
          <p><strong>Fecha inicio de pago:</strong> {payments.fecha_inicio_pago}</p>
        </div>

        <div style={modalStyles.tableContainer}>
          <table style={modalStyles.table}>
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Monto</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {localPayments.length === 0 ? (
                <tr>
                  <td colSpan="3">No hay datos de pagos disponibles.</td>
                </tr>
              ) : (
                localPayments.map((pago, index) => (
                  <tr key={pago.id_cuota || index}>
                    <td>{pago.fecha_pago_cuota}</td>
                    <td>{pago.monto_cuota}</td>
                    <td>
                      <select
                        value={pago.estado ? 'Pendiente' : 'Pagado'}
                        onChange={(e) => handleStateChange(index, e.target.value === 'Pendiente', pago.id_cuota)} // Pasar el id_cuota aquí
                        disabled={!pago.estado} // Si está en "Pagado", se deshabilita
                        style={modalStyles.select}
                      >
                        <option value="Pendiente">Pendiente</option>
                        <option value="Pagado">Pagado</option>
                      </select>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div style={modalStyles.buttonContainer}>
          <button style={modalStyles.closeButton} onClick={onClose}>
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

// Estilos del modal
const modalStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    zIndex: 1000,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: '#fff',
    width: '60%',
    maxWidth: '600px',
    padding: '20px',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
    position: 'relative',
    animation: 'fadeIn 0.3s ease',
    fontFamily: '"Roboto", sans-serif',
    maxHeight: '80vh',
    overflow: 'hidden',
  },
  title: {
    fontSize: '24px',
    fontWeight: '600',
    color: '#333',
    marginBottom: '10px',
    textAlign: 'center',
  },
  clientName: {
    fontSize: '18px',
    fontWeight: '500',
    color: '#555',
    marginBottom: '20px',
    textAlign: 'center',
  },
  clientInfo: {
    marginBottom: '20px',
    textAlign: 'left',
  },
  tableContainer: {
    maxHeight: '250px',
    overflowY: 'auto',
    marginBottom: '20px',
    textAlign: 'center',
  },
  table: {
    width: '80%',
    margin: '0 auto',
    borderCollapse: 'collapse',
    marginTop: '20px',
  },
  th: {
    backgroundColor: '#f5f5f5',
    textAlign: 'left',
    padding: '12px 15px',
    fontSize: '16px',
    fontWeight: '600',
    color: '#333',
    borderBottom: '2px solid #ddd',
  },
  td: {
    padding: '12px 15px',
    fontSize: '14px',
    color: '#555',
    borderBottom: '1px solid #eee',
  },
  select: {
    padding: '8px',
    fontSize: '14px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    cursor: 'pointer',
    backgroundColor: '#fff',
    outline: 'none',
    color: '#333',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
    marginTop: '20px',
  },
  closeButton: {
    padding: '12px 24px',
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: '600',
    transition: 'background-color 0.3s',
  },
};

export default ModalPay;
