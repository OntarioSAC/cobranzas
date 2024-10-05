import React, { useState, useContext } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { UserContext } from '../context/userContext'; // Asegúrate de que la ruta es correcta

import backgroundVideo from '../assests/video/ontarioVideo.mp4';
import logo from '../assests/img/logodarkbackground.png';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import ButtonLoader from '../components/buttonLoader.jsx';  // Importamos el componente Button
import InputLogin from '../components/inputLogin.jsx';  // Importamos el nuevo componente

const Login = () => {
    const { login, token } = useContext(UserContext);
    const navigate = useNavigate();

    const [username, setUsername] = useState('');

    // const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);  // Estado para manejar el loading

    if (token) {
        return <Navigate to="/" />;
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
    
        try {
            await login(username, password);
            navigate('/'); // Redirige a la página principal después de un inicio de sesión exitoso
        } catch (err) {
            // Manejar el error mostrando un mensaje al usuario
            alert(err.message || 'Error al iniciar sesión.');
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
                <form onSubmit={handleLogin}>
                    <InputLogin
                        icon={faUser}
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <InputLogin
                        icon={faLock}
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <div style={styles.options}>
                        <a href="/forgot-password" style={styles.link}>
                            ¿Olvidaste tu contraseña?
                        </a>
                    </div>

                    {/* Usamos el botón con animación de carga */}
                    <ButtonLoader
                        type="submit"
                        label="Ingresar"
                        onClick={handleLogin}
                        loading={loading}  // Indicamos si está en estado de carga
                    />
                </form>
            </div>
        </div>
    );
};

export default Login;