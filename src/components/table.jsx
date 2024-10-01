import React, { useState, useRef, useEffect, useContext } from 'react';
import { PaymentsContext } from "./../context/paymentsContext.jsx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileInvoiceDollar, faUser, faDollarSign } from '@fortawesome/free-solid-svg-icons';
import ModalPay from './modalPay.jsx';

const Table = ({ data }) => {
  const { loadPayments, setClientId } = useContext(PaymentsContext); // Importar setClientId y loadPayments del contexto
  const containerRef = useRef(null); // Ref para detectar clicks fuera del área seleccionada
  const [selectedRow, setSelectedRow] = useState(null); // Estado para la fila seleccionada
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 }); // Posición del mouse para el menú flotante
  const [isAnimating, setIsAnimating] = useState(false); // Controla la animación del botón flotante
  const [showModal, setShowModal] = useState(false); // Controla la visualización del modal de pagos
  const [selectedClient, setSelectedClient] = useState(null); // Estado para el cliente seleccionado
  const [paymentsLoaded, setPaymentsLoaded] = useState(false); // Estado para evitar recargar pagos innecesariamente

  // Cerrar la selección si se hace clic fuera del contenedor
  const handleClickOutside = (event) => {
    if (containerRef.current && !containerRef.current.contains(event.target)) {
      setSelectedRow(null);
      setIsAnimating(false);
    }
  };

  // Añadir y limpiar el event listener para clics fuera del área seleccionada
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Manejar el clic en una fila de la tabla
  const handleRowClick = (event, index) => {
    if (selectedRow !== null) {
      setSelectedRow(null);
      setIsAnimating(false);
    } else {
      const containerRect = containerRef.current.getBoundingClientRect();
      const x = event.clientX - containerRect.left + 42;
      const y = event.clientY - containerRect.top + 45;

      setMousePosition({ x, y });
      setSelectedRow(index);
      setIsAnimating(true);
    }
  };

  // Abrir el modal de pagos para un cliente específico
  const handleOpenModalPay = (client) => {
    setSelectedClient(client);  // Establecer el cliente seleccionado
    setClientId(client.id_fichadc); // Guardar el clientId en el PaymentsContext
    setPaymentsLoaded(false); // Reiniciar el estado de paymentsLoaded
    setShowModal(true); // Mostrar el modal
  };

   // Abrir el modal de pagos para un cliente específico
   const handleOpenModalInitial = (client) => {
    setSelectedClient(client);  // Establecer el cliente seleccionado
    setClientId(client.id_fichadc); // Guardar el clientId en el PaymentsContext
    setPaymentsLoaded(false); // Reiniciar el estado de paymentsLoaded
    setShowModal(true); // Mostrar el modal
  };

  // Cargar los pagos solo si el cliente cambia y los pagos no están ya cargados
  useEffect(() => {
    if (selectedClient && selectedClient.id_fichadc && !paymentsLoaded) {
      loadPayments();
      setPaymentsLoaded(true); // Marcar los pagos como cargados
    }
  }, [selectedClient, paymentsLoaded, loadPayments]);

  // Cerrar el modal de pagos
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedRow(null);
    setIsAnimating(false);
  };

  // Estilos para la tabla
  const tableStyles = {
    width: '85%',
    borderCollapse: 'separate',
    borderSpacing: '0',
    fontFamily: 'Arial, sans-serif',
    borderRadius: '15px',
    overflow: 'hidden',
    marginLeft: '200px',
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
            {data.map((row, index) => (
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
            <button style={buttonStyles} title="Ver cronograma de pagos" onClick={() => handleOpenModalPay(data[selectedRow])}>
              <FontAwesomeIcon icon={faFileInvoiceDollar} />
            </button>

            <button style={buttonStyles} title="Ver cuota inicial">
              <div style={{ position: 'relative' }}>
                <FontAwesomeIcon icon={faDollarSign}  onClick={() => handleOpenModalInitial(data[selectedRow])}/> {/* Ícono de dinero */}
                <span style={{
                  position: 'absolute',
                  top: '-13px',
                  right: '5px',
                  backgroundColor: '#1c284c',
                  color: 'white',
                  padding: '2px 8px',  // Ajustamos el padding para que la palabra "Inicial" quepa bien
                  borderRadius: '12px', // Lo hacemos más ovalado para adaptarse a la palabra
                  fontSize: '10px',
                  fontWeight: 'bold'
                }}>
                  Inicial
                </span> {/* Etiqueta que indica "Inicial" */}
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
