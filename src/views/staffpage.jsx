// src/pages/StaffPage.jsx
import React, { useEffect, useContext } from 'react';
import { Context } from '../controllers/appContext.jsx';
import MTKImage from '../assests/img/area/MKT.png';
import ProfilePhoto from '../components/profilePhoto.jsx'; // Importamos ProfilePhoto

const StaffPage = () => {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        actions.loadStaff();
    }, [actions]);

    const styles = {
        page: { textAlign: 'center', padding: '50px 0' },
        title: { fontSize: '2.5rem', marginBottom: '30px', color: '#1c284c' },
        container: { display: 'flex', justifyContent: 'center', gap: '30px', flexWrap: 'wrap' },
        card: {
            position: 'relative',
            width: '300px',
            height: '460px',
            borderRadius: '0 50px 0 50px',
            overflow: 'hidden',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            transition: 'transform 0.3s ease',
        },
        background: {
            width: '100%',
            height: '50%',
            backgroundImage: `url(${MTKImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
        },
        profileContainer: {
            display: 'flex',
            justifyContent: 'center', // Centra horizontalmente
            alignItems: 'center',     // Centra verticalmente
            height: '100px',           // Asegura que tenga altura fija
            marginTop: '-50px',        // Ajusta la posición del círculo hacia arriba
        },
        content: { paddingTop: '50px', textAlign: 'center' },
        role: { fontWeight: 'bold', color: '#1c284c', margin: '10px 0' },
        description: { color: '#6c757d', marginBottom: '15px' },
    };

    return (
        <div style={styles.page}>
            <h1 style={styles.title}>Staff Ontario</h1>
            <div style={styles.container}>
                {store.staffMembers.map((member) => (
                    <div key={member.id_persona_staff} style={styles.card}>
                        <div style={styles.background}></div>
                        <div style={styles.profileContainer}>
                            <ProfilePhoto foto={member.foto} size={100} /> {/* Enviamos la foto */}
                        </div>
                        <div style={styles.content}>
                            <h2>{member.nombres} {member.apellidos}</h2>
                            <p style={styles.role}>{member.area}</p>
                            <p style={styles.description}>
                                {`Empresa: ${member.empresa.nombre_empresa}`}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StaffPage;
