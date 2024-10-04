import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import '../styles/Components.css'; // Importar el archivo CSS

const ButtonLoader = ({ onClick, label, type = 'button', loading = false, disabled = false }) => {
    return (
        <button
            type={type}
            className={`button-loader ${loading || disabled ? 'disabled' : ''}`} // Aplicar clases
            onClick={onClick}
            disabled={loading || disabled}
        >
            {loading ? (
                <FontAwesomeIcon icon={faCircleNotch} spin className="loading-icon" />
            ) : null}
            {loading ? 'Cargando...' : label}
        </button>
    );
};

export default ButtonLoader;
