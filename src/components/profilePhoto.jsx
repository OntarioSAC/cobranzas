// src/components/ProfilePhoto.jsx
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'; // Ícono por defecto

const ProfilePhoto = ({ foto, size = 100 }) => {
    const styles = {
        container: {
            width: `${size}px`,
            height: `${size}px`,
            borderRadius: '50%',
            overflow: 'hidden',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            border: '5px solid white',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        },
        image: {
            width: '100%',
            height: '100%',
            objectFit: 'cover',
        },
        icon: {
            fontSize: `${size / 2}px`, // Ajusta el tamaño del ícono según el círculo
            color: '#ccc',
        },
    };

    return (
        <div style={styles.container}>
            {foto ? (
                <img src={foto} alt="Foto de usuario" style={styles.image} />
            ) : (
                <FontAwesomeIcon icon={faUserCircle} style={styles.icon} />
            )}
        </div>
    );
};

export default ProfilePhoto;
