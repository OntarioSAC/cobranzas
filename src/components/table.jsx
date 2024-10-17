import React, { useState, useRef, useEffect, useContext } from 'react';
import { PaymentsContext } from "./../context/paymentsContext.jsx";
import ActionButtons from './actionbuttons.jsx';
import ModalPay from './modalPay.jsx';
import ModalInitial from './modalInitial.jsx';

const Table = ({ data }) => {
  const { loadPayments, setClientId } = useContext(PaymentsContext);
  const containerRef = useRef(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showButtons, setShowButtons] = useState(false);  // Nuevo estado para visibilidad de botones
  const [showModalPay, setShowModalPay] = useState(false);
  const [showModalInitial, setShowModalInitial] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [paymentsLoaded, setPaymentsLoaded] = useState(false);

  const handleRowClick = (event, index) => {
    const x = event.clientX;
    const y = event.clientY;

    if (selectedRow === index) {
      setSelectedRow(null);
      setShowButtons(false); // Ocultar los botones al hacer clic en la misma fila
    } else {
      setMousePosition({ x, y });
      setSelectedRow(index);
      setShowButtons(true);  // Mostrar los botones al seleccionar una nueva fila
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setSelectedRow(null);
        setShowButtons(false);  // Ocultar botones si se hace clic fuera
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleOpenModalPay = (client) => {
    setSelectedClient(client);
    setClientId(client.id_fichadc);
    setPaymentsLoaded(false);
    setShowModalPay(true);
  };

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

  const handleCloseModalPay = () => {
    setShowModalPay(false);
    setSelectedRow(null);
    setShowButtons(false);  // Cerrar botones al cerrar el modal
  };

  const handleCloseModalInitial = () => {
    setShowModalInitial(false);
    setSelectedRow(null);
    setShowButtons(false);  // Cerrar botones al cerrar el modal
  };

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

  return (
    <div ref={containerRef}>
      <table style={tableStyles}>
        <thead>
          <tr>
            <th style={thStyles}>NOMBRES Y APELLIDOS</th>
            <th style={thStyles}>PROYECTO</th>
            <th style={thStyles}>LOTE</th>
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
              <td style={tdStyles}>
                {row.personas.length > 0 && row.personas.map((persona, idx) => (
                  <div key={idx}>
                    {persona.nombres} {persona.apellidos}
                  </div>
                ))}
              </td>
              <td style={tdStyles}>{row.proyecto}</td>
              <td style={tdStyles}>{row.lote}</td>
              <td style={tdStyles}>{row.morosidad ? 'Sí' : 'No'}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedRow !== null && showButtons && (
        <ActionButtons
          client={data[selectedRow]}
          handleOpenModalPay={handleOpenModalPay}
          handleOpenModalInitial={handleOpenModalInitial}
          mousePosition={mousePosition}
        />
      )}

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
    </div>
  );
};

export default Table;
