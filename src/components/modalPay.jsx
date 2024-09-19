import React, { useState, useEffect, useRef, useContext } from 'react';
import { PaymentsContext } from '../context/paymentsContext'; // Importamos el contexto de pagos

const ModalPay = ({ show, onClose, client }) => {
  const { payments } = useContext(PaymentsContext); // Obtenemos los pagos directamente desde el contexto
  const [localPayments, setLocalPayments] = useState([]);

  // Actualizamos el estado local cuando los pagos cambian
  useEffect(() => {
    if (show) {
      console.log('Mostrando modal con datos de pagos:', payments);
      const cuotas = payments?.cuotas || []; // Acceder a las cuotas

      if (Array.isArray(cuotas)) {
        console.log('Cuotas recibidas:', cuotas);
        setLocalPayments([...cuotas]); // Asignar las cuotas a 'localPayments'
      } else {
        console.log('No es un array válido de cuotas');
      }
    }
  }, [payments, show]); // Dependemos del cambio de pagos y de show

  const modalRef = useRef(null);

  const handleSave = () => {
    // Aquí puedes guardar los cambios que se hagan
    onClose();
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

  if (!show) return null; // Si no está visible, no mostramos el modal

  return (
    <div style={modalStyles.overlay}>
      <div style={modalStyles.modal} ref={modalRef}>
        <h2>Cronograma de Pagos</h2>
        <h3>Cliente: {client.nombres} {client.apellidos}</h3>
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
                  <td>{pago.estado ? 'Pagado' : 'Pendiente'}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <div style={modalStyles.buttonContainer}>
          <button style={modalStyles.saveButton} onClick={handleSave}>
            Guardar
          </button>
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
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    zIndex: 1000,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: '#fff',
    width: '50%',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    position: 'relative',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px',
  },
  td: {
    padding: '10px',
    textAlign: 'left',
    fontSize: '14px',
    borderBottom: '1px solid #ddd',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '10px',
    marginTop: '20px',
  },
  saveButton: {
    padding: '10px 20px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  closeButton: {
    padding: '10px 20px',
    backgroundColor: '#1c284c',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default ModalPay;
