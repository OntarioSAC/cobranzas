import React from 'react';
import '../styles/Components.css'; // Importar los estilos

const CustomCheckbox = ({ checked, onChange, label }) => {
    return (
        <div className="custom-checkbox-container">
            <input
                type="checkbox"
                id="customCheckbox"
                className="custom-checkbox"
                checked={checked}
                onChange={onChange} // Maneja el cambio de estado
            />
            <label htmlFor="customCheckbox" className="custom-checkbox-label">
                <span className="custom-checkbox-indicator"></span>
                {label}
            </label>
        </div>
    );
};

export default CustomCheckbox;
