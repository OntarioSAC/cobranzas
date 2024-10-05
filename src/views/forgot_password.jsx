import React, { useState, useContext  } from 'react';
import backgroundVideo from '../assests/video/ontarioVideo.mp4';
import logo from '../assests/img/logodarkbackground.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import ButtonLoader from '../components/buttonLoader.jsx';  // Importamos el componente ButtonLoader

import { UserContext } from '../context/userContext';
import { Navigate } from 'react-router-dom';



const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);  // Estado de carga para el botón

    const { token } = useContext(UserContext);

    if (token) {
        // Usuario autenticado, redirige a '/'
        return <Navigate to="/" />;
      }

    const handleForgotPassword = async (e) => {
        e.preventDefault();
        setLoading(true);
    
        try {
            const response = await fetch('http://127.0.0.1:8000/api/v1/password-reset/request/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });
    
            const data = await response.json();
    
            if (!response.ok) {
                throw new Error(data.error || 'Error al enviar el correo de recuperación.');
            }
    
            console.log('Correo de recuperación enviado:', data);
            alert('Se ha enviado un enlace de recuperación a su correo electrónico.');
    
        } catch (error) {
            console.error('Error al enviar el correo de recuperación:', error);
            alert(error.message);
        } finally {
            setLoading(false);
        }
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
            marginRight: '10px',
        },
        link: {
            color: 'white',
            textDecoration: 'none',
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

                    {/* Usamos el botón con animación de carga */}
                    <ButtonLoader
                        type="submit"
                        label="Enviar enlace de recuperación"
                        onClick={handleForgotPassword}
                        loading={loading}  // Indicamos si está en estado de carga
                    />
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