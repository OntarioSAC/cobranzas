import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const InputField = ({ label, type, name, value, onChange, required, isExtendible = false, options = [] }) => {
  const [filteredOptions, setFilteredOptions] = useState(options); // Mantener siempre las opciones completas
  const [showOptions, setShowOptions] = useState(false);

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    onChange(e); // Llama a la función onChange pasada desde el componente padre

    if (isExtendible) {
      // Filtra las opciones según el valor del input
      const matches = options.filter((option) =>
        option.toLowerCase().includes(newValue.toLowerCase())
      );
      setFilteredOptions(matches);
      setShowOptions(true); // Muestra las opciones filtradas
    }
  };

  const handleOptionClick = (option) => {
    onChange({ target: { name, value: option } }); // Enviar el valor seleccionado al componente padre
    setShowOptions(false); // Cerramos la lista desplegable
  };

  const toggleDropdown = () => {
    setFilteredOptions(options); // Resetea las opciones para mostrar todas cuando se hace clic en el dropdown
    setShowOptions((prevState) => !prevState); // Alterna el estado de visibilidad del menú desplegable
  };

  const handleFocus = () => {
    if (isExtendible) {
      setFilteredOptions(options); // Muestra todas las opciones cuando el campo está enfocado
      setShowOptions(true); // Mostrar el menú desplegable cuando el campo está enfocado
    }
  };

  const handleBlur = () => {
    setTimeout(() => setShowOptions(false), 200); // Espera antes de cerrar para permitir clic en las opciones
  };

  return (
    <div style={styles.inputContainer}>
      <label>{label}</label>
      <div style={styles.inputWrapper}>
        {type === 'date' ? (
          <div style={styles.inputWithIcon}>
            <DatePicker
              selected={value}
              onChange={(date) => onChange({ target: { name, value: date } })}
              dateFormat="dd/MM/yyyy"
              customInput={
                <div style={styles.customInput}>
                  <input
                    value={value ? value.toLocaleDateString() : ''}
                    onChange={handleInputChange}
                    required={required}
                    style={styles.input}
                  />
                  <span style={styles.icon}>
                    <FontAwesomeIcon icon={faCalendarAlt} />
                  </span>
                </div>
              }
            />
          </div>
        ) : (
          <>
            <input
              type={type}
              name={name}
              value={value}
              onChange={handleInputChange}
              required={required}
              style={styles.input}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
            {isExtendible && (
              <span style={styles.icon} onClick={toggleDropdown}>
                <FontAwesomeIcon icon={faChevronDown} />
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
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = styles.suggestionItemHover.backgroundColor;
                e.target.style.color = styles.suggestionItemHover.color;
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = styles.suggestionItem.backgroundColor;
                e.target.style.color = styles.suggestionItem.color;
              }}
              onMouseDown={() => handleOptionClick(option)}
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
    alignItems: 'center',
  },
  inputWithIcon: {
    position: 'relative',
    width: '100%',
  },
  customInput: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    position: 'relative',
  },
  input: {
    padding: '15px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    width: '100%',
    fontSize: '16px',
    paddingRight: '50px',
  },
  icon: {
    position: 'absolute',
    right: '15px',
    top: '50%',
    transform: 'translateY(-50%)',
    fontSize: '18px',
    color: '#999',
    cursor: 'pointer',
  },
  suggestions: {
    position: 'absolute',
    top: 'calc(100% - 3px)',
    left: 0,
    right: 0,
    backgroundColor: '#f3f1eb',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    listStyle: 'none',
    padding: '5px',
    maxHeight: '150px',
    overflowY: 'auto',
    scrollbarWidth: 'none',
    msOverflowStyle: 'none',
    zIndex: 10,
  },
  suggestionItem: {
    padding: '10px',
    cursor: 'pointer',
    color: '#1c284c',
    backgroundColor: '#f3f1eb',
    borderRadius: '10px',
    fontWeight: 'bold',
    transition: 'background-color 0.3s, color 0.3s',
  },
  suggestionItemHover: {
    backgroundColor: '#cbf000',
    color: '#1c284c',
  },
};

// Añadir esta regla global de CSS para ocultar la barra de desplazamiento en navegadores basados en WebKit (como Chrome y Safari)
const globalStyles = `
  ::-webkit-scrollbar {
    display: none;
  }
`;
document.head.insertAdjacentHTML('beforeend', `<style>${globalStyles}</style>`);

export default InputField;
