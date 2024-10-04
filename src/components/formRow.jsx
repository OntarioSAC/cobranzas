import React from 'react';

const FormRow = ({ children }) => (
  <div style={styles.row}>
    {children}
  </div>
);

const styles = {
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '50px',
    margin: '20px',
  },
};

export default FormRow;
