import React, { useEffect, useRef, useContext } from 'react';
import { PaymentsContext } from '../context/paymentsContext'; // Importamos el contexto de pagos

const ModalInitial = ({ show, onClose, client }) => {
  const { payments } = useContext(PaymentsContext); // Obtenemos los pagos y la función updatePayment desde el contexto



  const modalRef = useRef(null);


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

  return (
    <div style={modalStyles.overlay}>
      <div style={modalStyles.modal} ref={modalRef}>
        {/* Botón X para cerrar el modal */}
        <button style={modalStyles.closeButton} onClick={onClose}>
          &times;
        </button>
        <h2 style={modalStyles.title}>TIPO DE INICIAL</h2>
        <h3 style={modalStyles.clientName}>{client.nombres} {client.apellidos}</h3>
        <h3 style={modalStyles.clientName}>{client.proyecto} {client.lote}</h3>

        {/* Aquí se muestra la información adicional del cliente */}
        <div style={modalStyles.clientInfo}>
          <p><strong>TIPO DE CUOTA INICIAL:</strong> {payments.tipo_cuota_inicial === 'C' ? 'Completa' : 'Fraccionada'}</p>
          <p><strong>MONEDA SEGUN CONTRATO:</strong> S/. {payments.tipo_moneda}</p>
          <p><strong>CUOTA INICIAL:</strong> S/. {payments.cuota_inicial_soles}</p>
          <p><strong>TIPO DE CAMBIO:</strong> {payments.tipo_cambio}</p>
          <p><strong>FECHA INICIO DE PAGO:</strong> {payments.fecha_inicio_pago}</p>
        </div>
      </div>
    </div>
  );
};


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

export default ModalInitial;
