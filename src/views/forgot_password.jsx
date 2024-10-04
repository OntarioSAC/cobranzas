import React, { useState } from 'react';
import backgroundVideo from '../assests/video/ontarioVideo.mp4';
import logo from '../assests/img/logodarkbackground.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');

    const handleForgotPassword = (e) => {
        e.preventDefault();
        console.log('Password recovery for:', email);
    };

    const styles = {
        container: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '90vh',
            position: 'relative',
            overflow: 'hidden',
            fontFamily: 'Arial, sans-serif',
            margin: 0,
            padding: 0,
        },
        videoBackground: {
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            objectFit: 'cover',
            zIndex: -1,
        },
        forgotBox: {
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            padding: '40px',
            borderRadius: '20px',
            textAlign: 'center',
            maxWidth: '400px',
            width: '100%',
            backdropFilter: 'blur(10px)',
            zIndex: 1,
        },
        logo: {
            width: '150px',
            marginBottom: '20px',
        },
        inputGroup: {
            marginBottom: '70px',
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
            marginRight: '10px'
        },
        link: {
            color: 'white',
            textDecoration: 'none',
        },
        sendButton: {
            width: '100%',
            padding: '12px 15px',
            border: 'none',
            borderRadius: '30px',
            backgroundColor: '#cbf000',
            color: '#1c284c',
            fontSize: '16px',
            cursor: 'pointer',
            marginBottom: '20px',
        },
    };

    return (
        <div style={styles.container}>
            <video autoPlay muted loop style={styles.videoBackground}>
                <source src={backgroundVideo} type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            <div style={styles.forgotBox}>
                <img src={logo} alt="Logo" style={styles.logo} />
                <form onSubmit={handleForgotPassword}>
                    <div style={styles.inputGroup}>
                        <FontAwesomeIcon icon={faEnvelope} style={styles.icon} />
                        <input
                            type="email"
                            placeholder="Correo electrónico"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            style={styles.input}
                        />
                    </div>
                    <button type="submit" style={styles.sendButton}>
                        Enviar enlace de recuperación
                    </button>
                </form>
                <div>
                    <a href="/login" style={styles.link}>
                        Volver al login
                    </a>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
