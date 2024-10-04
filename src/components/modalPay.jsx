import React, { useState, useEffect, useRef, useContext } from 'react';
import { PaymentsContext } from '../context/paymentsContext'; // Importamos el contexto de pagos
import Swal from 'sweetalert2'; // Importamos SweetAlert2
import 'sweetalert2/dist/sweetalert2.min.css'; // Importamos los estilos de SweetAlert2

const ModalPay = ({ show, onClose, client }) => {
  const { payments, updatePayment } = useContext(PaymentsContext); // Obtiene los pagos y la función updatePayment desde el contexto
  const [localPayments, setLocalPayments] = useState([]);

  // Actualiza el estado local cuando los pagos cambian
  useEffect(() => {
    if (show && payments.cuotas && payments.cuotas.length > 0) {
      //cuotas por fecha de mayor a menor
      const sortedPayments = [...payments.cuotas].sort((a, b) => new Date(b.fecha_pago_cuota) - new Date(a.fecha_pago_cuota));
      setLocalPayments(sortedPayments); // Asigna las cuotas a 'localPayments' ordenadas por fecha
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
        Swal.fire({
          title: '¡Pago actualizado!',
          text: 'El pago ha sido actualizado con éxito.',
          icon: 'success',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#4CAF50',
        });
      })
      .catch((error) => {
        console.error("Error al actualizar el pago en el servidor:", error);
        Swal.fire({
          title: 'Error',
          text: 'Hubo un error al actualizar el pago.',
          icon: 'error',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#f44336',
        });
      });
  };

  useEffect(() => {
    if (!show) return;

    const handleClickOutside = (event) => {
      // Verificamos si el clic ocurrió dentro del modal o dentro de la alerta de SweetAlert2
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target) &&
        !event.target.closest('.swal2-container') // Evitamos cerrar si el clic fue en SweetAlert2
      ) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [show, onClose]);

  if (!show) return null;

  // Calculamos las cuotas restantes
  const cuotasRestantes = payments.numero_cuotas - payments.numero_cuotas_pagadas;

  return (
    <div style={modalStyles.overlay}>
      <div style={modalStyles.modal} ref={modalRef}>
        {/* Botón X para cerrar el modal */}
        <button style={modalStyles.closeButton} onClick={onClose}>
          &times;
        </button>
        <h2 style={modalStyles.title}>Cronograma de Pagos</h2>
        <h3 style={modalStyles.clientName}>{client.nombres} {client.apellidos}</h3>
        <h3 style={modalStyles.clientName}>{client.proyecto} {client.lote}</h3>

        {/* Aquí se muestra la información adicional del cliente */}
        <div style={modalStyles.infoBox}>
          <p style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '18px', marginBottom: '10px' }}>
            INFORMACION DE LAS COUTAS DEL CLIENTE
          </p>
          <div style={modalStyles.infoRow}>
            <div style={modalStyles.rightColumn}>
              <p><strong>NUMERO DE CUOTAS TOTALES:</strong> {payments.numero_cuotas}</p>
              <p><strong>NUMERO DE CUOTAS PAGADAS:</strong> {payments.numero_cuotas_pagadas}</p>
              <p><strong>NUMERO DE CUOTAS RESTANTES:</strong> {cuotasRestantes}</p>
            </div>
            <div style={modalStyles.leftColumn}>
              <p><strong>Moneda Segun contrato:</strong> {payments.tipo_moneda}</p>
              <p><strong>Fecha inicio de pago:</strong> {payments.fecha_inicio_pago}</p>
            </div>

          </div>
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
                    <td>
                      {/* verifica si es soles o dolares y cambia el simbolo */}
                      {payments.tipo_moneda === 'SOLES' ? `S/. ${pago.monto_cuota}` : `$ ${pago.monto_cuota}`}
                    </td>
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
      </div>
    </div>
  );
};

// Estilos del modal
const modalStyles = {
  infoBox: {
    padding: '15px',
    marginBottom: '20px',
  },
  infoRow: {
    display: 'flex',
    justifyContent: 'space-between', // Separa las columnas a los extremos
    alignItems: 'flex-start', // Alinea el contenido en la parte superior
    marginTop: '10px',
  },
  leftColumn: {
    flex: '1',
    textAlign: 'left', // Alineación a la izquierda para esta columna
  },
  rightColumn: {
    flex: '1',
  },
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
    width: '100%',
    maxWidth: '700px',
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
  closeButton: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    padding: '5px 10px',
    backgroundColor: 'transparent',
    border: 'none',
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#333',
    cursor: 'pointer',
  },

};

export default ModalPay;
