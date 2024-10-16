import React, { useState, useRef, useEffect, useContext } from 'react';
import { PaymentsContext } from "./../context/paymentsContext.jsx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileInvoiceDollar, faUser, faDollarSign } from '@fortawesome/free-solid-svg-icons';
import ModalPay from './modalPay.jsx';
import ModalInitial from './modalInitial.jsx';

const Table = ({ data }) => {
  const { loadPayments, setClientId } = useContext(PaymentsContext);
  const containerRef = useRef(null); // Referencia al contenedor de la tabla
  const [selectedRow, setSelectedRow] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isAnimating, setIsAnimating] = useState(false);
  const [showModalPay, setShowModalPay] = useState(false);
  const [showModalInitial, setShowModalInitial] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [paymentsLoaded, setPaymentsLoaded] = useState(false);

  // Manejar el clic en una fila de la tabla
  const handleRowClick = (event, index) => {
    if (selectedRow === index) {
      // Si ya está seleccionada la fila, deseleccionarla y ocultar los botones
      setSelectedRow(null);
      setIsAnimating(false);
    } else {
      // Captura las coordenadas del mouse al hacer clic
      const x = event.clientX;
      const y = event.clientY;
      setMousePosition({ x, y });
      setSelectedRow(index);
      setIsAnimating(true);
    }
  };

  // Detectar clics fuera de la tabla para ocultar los botones
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setSelectedRow(null); // Ocultar botones si el clic fue fuera de la tabla
        setIsAnimating(false);
      }
    };

    // Agregar el evento de clic cuando el componente se monta
    document.addEventListener('mousedown', handleClickOutside);

    // Eliminar el evento de clic cuando el componente se desmonta
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Abrir el modal de pagos para un cliente específico
  const handleOpenModalPay = (client) => {
    setSelectedClient(client);
    setClientId(client.id_fichadc);
    setPaymentsLoaded(false);
    setShowModalPay(true);
  };

  // Abrir el modal de Inicial para un cliente específico
  const handleOpenModalInitial = (client) => {
    setSelectedClient(client);
    setClientId(client.id_fichadc);
    setPaymentsLoaded(false);
    setShowModalInitial(true);
  };

  useEffect(() => {
    if (selectedClient && selectedClient.id_fichadc && !paymentsLoaded) {
      loadPayments();
      setPaymentsLoaded(true);
    }
  }, [selectedClient, paymentsLoaded, loadPayments]);

  // Cerrar el modal de pagos
  const handleCloseModalPay = () => {
    setShowModalPay(false);
    setSelectedRow(null);
    setIsAnimating(false);
  };

  const handleCloseModalInitial = () => {
    setShowModalInitial(false);
    setSelectedRow(null);
    setIsAnimating(false);
  };

  // Estilos para la tabla
  const tableStyles = {
    width: '85%',
    marginTop: '30px',
    borderCollapse: 'separate',
    borderSpacing: '0',
    fontFamily: 'Arial, sans-serif',
    borderRadius: '15px',
    overflow: 'hidden',
  };

  const thStyles = {
    backgroundColor: '#1c284c',
    color: 'white',
    padding: '15px',
    textAlign: 'left',
    fontSize: '14px',
    letterSpacing: '0.05em',
    lineHeight: '1.5',
  };

  const tdStyles = {
    padding: '8px',
    textAlign: 'left',
  };

  const trStyles = (index) => ({
    backgroundColor: selectedRow === index ? '#cbf000' : '#fff',
    cursor: 'pointer',
  });

  // Cambiamos a position: fixed para que los botones floten sobre la ventana
  const buttonContainer = {
    position: 'fixed', // Botones en posición fija en la ventana
    top: `${mousePosition.y}px`,
    left: `${mousePosition.x}px`,
    display: selectedRow !== null ? 'flex' : 'none',
    flexDirection: 'column',
    gap: '10px',
    zIndex: 1000,
    animation: isAnimating ? 'fade-in 0.3s ease' : 'none',
  };

  const buttonStyles = {
    width: '50px',
    height: '50px',
    backgroundColor: '#4eb488',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '20px',
  };

  const proyectoStyles = {
    width: '180px',
  };

  const loteStyles = {
    width: '120px',
  };

  return (
    <div ref={containerRef}>
      <div>
        <table style={tableStyles}>
          <thead>
            <tr>
              <th style={thStyles}>NOMBRES Y APELLIDOS</th>
              <th style={{ ...thStyles, ...proyectoStyles }}>PROYECTO</th>
              <th style={{ ...thStyles, ...loteStyles }}>LOTE</th>
              <th style={thStyles}>MOROSIDAD</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr
                key={row.id_fichadc || index}
                style={trStyles(index)}
                onClick={(event) => handleRowClick(event, index)}
              >
                <td style={{ ...tdStyles, width: '200px' }}>
                  {row.personas.length > 0 && (
                    row.personas.map((persona, idx) => (
                      <div key={idx}>
                        {persona.nombres} {persona.apellidos}
                      </div>
                    ))
                  )}
                </td>                <td style={{ ...tdStyles, ...proyectoStyles, width: '200px' }}>{row.proyecto}</td>
                <td style={{ ...tdStyles, ...loteStyles, width: '100px' }}>{row.lote}</td>
                <td style={{ ...tdStyles, width: '100px' }}>{row.morosidad ? 'Sí' : 'No'}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {selectedRow !== null && (
          <div style={buttonContainer}>
            <button style={buttonStyles} title="Ver cronograma de pagos" onClick={() => handleOpenModalPay(data[selectedRow])}>
              <FontAwesomeIcon icon={faFileInvoiceDollar} />
            </button>

            <button style={buttonStyles} title="Ver cuota inicial" onClick={() => handleOpenModalInitial(data[selectedRow])}>
              <div style={{ position: 'relative' }}>
                <FontAwesomeIcon icon={faDollarSign} />
                <span style={{
                  position: 'absolute',
                  top: '-13px',
                  right: '5px',
                  backgroundColor: '#1c284c',
                  color: 'white',
                  padding: '2px 8px',
                  borderRadius: '12px',
                  fontSize: '10px',
                  fontWeight: 'bold'
                }}>
                  Inicial
                </span>
              </div>
            </button>

            <button style={buttonStyles} title="Ver perfil">
              <FontAwesomeIcon icon={faUser} />
            </button>
          </div>
        )}
      </div>

      {selectedClient && (
        <ModalPay
          show={showModalPay}
          onClose={handleCloseModalPay}
          client={selectedClient}
        />
      )}

      {selectedClient && (
        <ModalInitial
          show={showModalInitial}
          onClose={handleCloseModalInitial}
          client={selectedClient}
        />
      )}

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        tbody tr:hover {
          background-color: ${selectedRow === null ? '#cbf000' : 'none'} !important;
          transition: background-color 0.3s ease;
        }
      `}</style>
    </div>
  );
};

export default Table;
