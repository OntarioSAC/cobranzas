import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const InputLogin = ({ icon, type, placeholder, value, onChange }) => {
    const styles = {
        inputGroup: {
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
        },
        input: {
            width: '100%',
            padding: '15px',
            border: 'none',
            borderRadius: '30px',
            backgroundColor: '#fff',
            fontSize: '16px',
            outline: 'none',
            marginLeft: '10px',
        },
        icon: {
            color: '#fff',
            fontSize: '20px',
            marginRight: '10px',
        },
    };

    return (
        <div style={styles.inputGroup}>
            <FontAwesomeIcon icon={icon} style={styles.icon} />
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                required
                style={styles.input}
            />
        </div>
    );
};

export default InputLogin;
