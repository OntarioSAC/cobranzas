import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileInvoiceDollar, faUser, faDollarSign } from '@fortawesome/free-solid-svg-icons';

const ActionButtons = ({ client, handleOpenModalPay, handleOpenModalInitial, mousePosition }) => {
  const [isVisible, setIsVisible] = useState(false);

  // Hacer aparecer los botones con una animación de fade-in al montarse
  useEffect(() => {
    setIsVisible(true); // Activar la visibilidad al montar el componente
  }, []);

  const buttonContainer = {
    position: 'fixed',
    top: `${mousePosition.y}px`,
    left: `${mousePosition.x}px`,
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    zIndex: 1000,
    opacity: isVisible ? 1 : 0, // Controla la opacidad para el fade-in
    transform: isVisible ? 'scale(1)' : 'scale(0.8)', // Animación de escala
    transition: 'opacity 0.5s ease, transform 0.5s ease', // Transiciones para suavizar la aparición
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

  return (
    <div style={buttonContainer}>
      <button
        style={buttonStyles}
        title="Ver cronograma de pagos"
        onClick={() => handleOpenModalPay(client)}
      >
        <FontAwesomeIcon icon={faFileInvoiceDollar} />
      </button>

      <button
        style={buttonStyles}
        title="Ver cuota inicial"
        onClick={() => handleOpenModalInitial(client)}
      >
        <div style={{ position: 'relative' }}>
          <FontAwesomeIcon icon={faDollarSign} />
          <span
            style={{
              position: 'absolute',
              top: '-13px',
              right: '5px',
              backgroundColor: '#1c284c',
              color: 'white',
              padding: '2px 8px',
              borderRadius: '12px',
              fontSize: '10px',
              fontWeight: 'bold',
            }}
          >
            Inicial
          </span>
        </div>
      </button>

      <button style={buttonStyles} title="Ver perfil">
        <FontAwesomeIcon icon={faUser} />
      </button>
    </div>
  );
};

export default ActionButtons;
