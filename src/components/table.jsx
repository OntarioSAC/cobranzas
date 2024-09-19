// Table.jsx
import React, { useState, useRef, useEffect, useContext } from 'react';
import { Context } from "./../controllers/appContext.jsx";
import { PaymentsContext } from "./../context/paymentsContext.jsx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faUser } from '@fortawesome/free-solid-svg-icons';
import ModalPay from './modalPay.jsx';

const Table = () => {
  const { store, actions } = useContext(Context);
  const { loadPayments } = useContext(PaymentsContext);

  const containerRef = useRef(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isAnimating, setIsAnimating] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);

  const handleClickOutside = (event) => {
    if (containerRef.current && !containerRef.current.contains(event.target)) {
      setSelectedRow(null);
      setIsAnimating(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Cargar los clientes si no están cargados
  useEffect(() => {
    if (store.clients.length === 0) {
      actions.loadClients();
    }
  }, [store.clients.length, actions]);

  const handleRowClick = (event, index) => {
    if (selectedRow !== null) {
      setSelectedRow(null);
      setIsAnimating(false);
    } else {
      const containerRect = containerRef.current.getBoundingClientRect();
      const x = event.clientX - containerRect.left + 10;
      const y = event.clientY - containerRect.top;

      setMousePosition({ x, y });
      setSelectedRow(index);
      setIsAnimating(true);
    }
  };

  const handleOpenModal = async (client) => {
    setSelectedClient(client);
    await loadPayments(client.id_fichadc); // Cargar los pagos usando la variable global directamente
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedRow(null);
    setIsAnimating(false);
  };

  // Estilos para la tabla
  const tableStyles = {
    width: '100%',
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

  const headerText = {
    color: '#4CAF50',
    textAlign: 'center',
  };

  const buttonContainer = {
    position: 'absolute',
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
      <h2 style={headerText}>Datos de Clientes</h2>
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
            {store.clients.map((row, index) => (
              <tr
                key={row.id_fichadc || index}
                style={trStyles(index)}
                onClick={(event) => handleRowClick(event, index)}
              >
                <td style={tdStyles}>{row.nombres} {row.apellidos}</td>
                <td style={{ ...tdStyles, ...proyectoStyles }}>{row.proyecto}</td>
                <td style={{ ...tdStyles, ...loteStyles }}>{row.lote}</td>
                <td style={tdStyles}>{row.morosidad ? 'Sí' : 'No'}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {selectedRow !== null && (
          <div style={buttonContainer}>
            <button style={buttonStyles} title="Ver cronograma de pagos" onClick={() => handleOpenModal(store.clients[selectedRow])}>
              <FontAwesomeIcon icon={faCalendarAlt} />
            </button>
            <button style={buttonStyles} title="Ver perfil">
              <FontAwesomeIcon icon={faUser} />
            </button>
          </div>
        )}
      </div>

      {selectedClient && (
        <ModalPay
          show={showModal}
          onClose={handleCloseModal}
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
