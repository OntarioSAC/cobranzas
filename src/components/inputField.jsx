import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const InputField = ({ label, type, name, value, onChange, required, isExtendible = false, options = [] }) => {
  const [filteredOptions, setFilteredOptions] = useState(options); // Mantenemos siempre las opciones completas
  const [showOptions, setShowOptions] = useState(false);

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    onChange(e); // Llama a la función onChange pasada desde el padre

    if (isExtendible) {
      // Filtra las opciones según el valor del input
      const matches = options.filter((option) =>
        option.toLowerCase().includes(newValue.toLowerCase())
      );
      setFilteredOptions(matches);
      setShowOptions(true); // Muuestra las opciones filtradas
    }
  };

  const handleOptionClick = (option) => {
    onChange({ target: { name, value: option } }); // Enviamos el valor seleccionado al padre
    setShowOptions(false); // Cerramos la lista desplegable
  };

  const toggleDropdown = () => {
    setShowOptions((prevState) => !prevState); // Alterna el estado de visibilidad del menú desplegable
  };

  // Controla el cambio de fecha
  const handleDateChange = (date) => {
    onChange({ target: { name, value: date } }); // Enviamos la fecha seleccionada al padre
  };

  return (
    <div style={styles.inputContainer}>
      <label>{label}</label>
      <div style={styles.inputWrapper}>
        {type === 'date' ? (
          <>
            <DatePicker
              selected={value}
              onChange={handleDateChange}
              dateFormat="dd/MM/yyyy"
              customInput={
                <div style={styles.inputWithIcon}>
                  <input
                    value={value ? value.toLocaleDateString() : ''}
                    onChange={handleInputChange}
                    required={required}
                    style={styles.input}
                  />
                  <span
                    style={styles.icon}
                    onClick={() =>
                      document.querySelector('.react-datepicker__input-container input').focus()
                    }
                  >
                    <FontAwesomeIcon icon={faCalendarAlt} />
                  </span>
                </div>
              }
            />
          </>
        ) : (
          <>
            <input
              type={type}
              name={name}
              value={value}
              onChange={handleInputChange}
              required={required}
              style={styles.input}
              onFocus={() => setShowOptions(true)} // Mostrar opciones al enfocar el input
              onBlur={() => setTimeout(() => setShowOptions(false), 100)} // Espera antes de cerrar para permitir clic en las opciones
            />
            {isExtendible && (
              <span style={styles.icon} onClick={toggleDropdown}>
                <FontAwesomeIcon icon={faChevronDown} /> {/* Ícono de flecha */}
              </span>
            )}
          </>
        )}
      </div>
      {isExtendible && showOptions && filteredOptions.length > 0 && (
        <ul style={styles.suggestions}>
          {filteredOptions.map((option, index) => (
            <li
              key={index}
              style={styles.suggestionItem}
              onMouseDown={() => handleOptionClick(option)} // Capturamos el clic en la opción
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const styles = {
  inputContainer: {
    position: 'relative',
    width: '100%',
    marginBottom: '15px',
  },
  inputWrapper: {
    position: 'relative',
    width: '100%',
    display: 'flex',
    alignItems: 'center', // Alinea verticalmente los íconos dentro del input
  },
  inputWithIcon: {
    position: 'relative',
    width: '100%',
  },
  input: {
    padding: '15px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    width: 'calc(100% - 50px)',
    fontSize: '16px',
    paddingRight: '50px',
  },
  icon: {
    position: 'absolute',
    right: '15px',
    top: '50%',
    transform: 'translateY(-50%)',
    display: 'flex',
    alignItems: 'center',
    fontSize: '18px',
    color: '#999',
    cursor: 'pointer',
  },
  suggestions: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    border: '1px solid #ccc',
    borderRadius: '5px',
    listStyle: 'none',
    padding: '5px',
    maxHeight: '150px',
    overflowY: 'auto',
    zIndex: 10,
  },
  suggestionItem: {
    padding: '10px',
    cursor: 'pointer',
  },
};

export default InputField;
