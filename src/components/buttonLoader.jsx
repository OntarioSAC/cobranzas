import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';

const ButtonLoader = ({ onClick, label, type = 'button', style = {}, loading = false, disabled = false }) => {
    const defaultStyles = {
        width: '100%',
        padding: '12px 15px',
        border: 'none',
        borderRadius: '30px',
        backgroundColor: '#cbf000',
        color: '#1c284c',
        fontSize: '16px',
        cursor: loading || disabled ? 'not-allowed' : 'pointer',
        opacity: loading || disabled ? 0.6 : 1,
        marginBottom: '20px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        ...style, // Permite pasar estilos personalizados
    };

    return (
        <button
            type={type}
            style={defaultStyles}
            onClick={onClick}
            disabled={loading || disabled}
        >
            {loading ? (
                <FontAwesomeIcon icon={faCircleNotch} spin style={{ marginRight: '10px' }} />  // Animación de carga
            ) : null}
            {loading ? 'Cargando...' : label}
        </button>
    );
};

export default ButtonLoader;
