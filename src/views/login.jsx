import React, { useState } from 'react';
import backgroundVideo from '../assests/video/ontarioVideo.mp4';
import logo from '../assests/img/logodarkbackground.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Importar FontAwesomeIcon
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons'; // Importar íconos específicos

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        console.log('Logging in with:', email, password);
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
        loginBox: {
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
            marginRight: '10px'
        },
        options: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px',
            fontSize: '14px',
            color: 'white',
        },
        link: {
            color: 'white',
            textDecoration: 'none',
        },
        loginButton: {
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

            <div style={styles.loginBox}>
                <img src={logo} alt="Logo" style={styles.logo} />
                <form onSubmit={handleLogin}>
                    <div style={styles.inputGroup}>
                        <FontAwesomeIcon icon={faUser} style={styles.icon} />
                        <input
                            type="text"
                            placeholder="Username"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            style={styles.input}
                        />
                    </div>
                    <div style={styles.inputGroup}>
                        <FontAwesomeIcon icon={faLock} style={styles.icon} />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            style={styles.input}
                        />
                    </div>
                    <div style={styles.options}>
                        <a href="/forgot-password" style={styles.link}>
                            ¿Olvidaste tu contraseña?
                        </a>
                    </div>
                    <button type="submit" style={styles.loginButton}>
                        Ingresar
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
