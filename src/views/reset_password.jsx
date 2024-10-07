import React, { useState } from 'react';
import backgroundVideo from '../assests/video/ontarioVideo.mp4';
import logo from '../assests/img/logodarkbackground.png';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import ButtonLoader from '../components/buttonLoader.jsx';  // Importamos el componente Button
import InputLogin from '../components/inputLogin.jsx';  // Importamos el nuevo componente

import { useNavigate, useParams } from 'react-router-dom';


const ResetPassword = () => {

    const navigate = useNavigate();
    const { token } = useParams();

    console.log("Token recibido:", token);  // Para depuración

    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleResetPassword = async (e) => {
        e.preventDefault();
        setLoading(true);
    
        if (newPassword !== confirmPassword) {
          alert('Las contraseñas no coinciden.');
          setLoading(false);
          return;
        }
    
        try {
          const response = await fetch(`http://127.0.0.1:8000/api/v1/password-reset/confirm/${token}/`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              new_password: newPassword,
              confirm_password: confirmPassword,
            }),
          });
    
          const data = await response.json();
    
          if (!response.ok) {
            throw new Error(data.error || 'Error al restablecer la contraseña.');
          }
    
          alert('Contraseña actualizada correctamente.');
          navigate('/login');
        } catch (error) {
          console.error('Error:', error);
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
    };

    return (
        <div style={styles.container}>
            <video autoPlay muted loop style={styles.videoBackground}>
                <source src={backgroundVideo} type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            <div style={styles.loginBox}>
                <img src={logo} alt="Logo" style={styles.logo} />
                <form onSubmit={handleResetPassword}>
                    <InputLogin
                        icon={faLock}
                        type="password"
                        placeholder="Nueva contraseña"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <InputLogin
                        icon={faLock}
                        type="password"
                        placeholder="Confirmar nueva contraseña"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />

                    <ButtonLoader
                        type="submit"
                        label="Cambiar contraseña"
                        loading={loading}
                    />
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;
