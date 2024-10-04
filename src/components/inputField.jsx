import React from 'react';

const InputField = ({ label, type, name, value, onChange, required }) => (
  <div style={styles.inputContainer}>
    <label>{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      style={styles.input}
    />
  </div>
);

const styles = {
  inputContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '10px',
    width: '100%',
  },
  input: {
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    width: '100%',
  },
};

export default InputField;
