import React, { useContext } from 'react';
import { ProjectsContext } from '../context/projectsContext.jsx'; // Importación corregida

const CardProject = () => {
    const { projects } = useContext(ProjectsContext);

    // Contar cuántos proyectos han llegado
    const projectCount = projects.length;

    return (
        <div style={styles.container}>
            {projectCount > 0 ? (
                projects.map((project, index) => (
                    <div key={index} style={styles.card}>
                        {/* Sección superior con el logo o imagen del proyecto */}
                        <div style={styles.imageContainer}>
                            <img src="https://via.placeholder.com/200x100" alt="Imagen del Proyecto" style={styles.image} />
                        </div>

                        {/* Sección inferior con la información del proyecto */}
                        <div style={styles.infoContainer}>
                            <h3>{project.nombre_proyecto}</h3> {/* Asegúrate de usar el campo correcto, 'nombre_proyecto' */}
                        </div>
                    </div>
                ))
            ) : (
                <p>No hay proyectos disponibles.</p>
            )}
        </div>
    );
};

const styles = {
    container: {
        display: 'grid',              // Usamos grid para dividir en columnas
        gridTemplateColumns: 'repeat(3, 1fr)',  // Tres columnas con igual tamaño
        gap: '20px',                  // Espacio entre las cartas
        justifyItems: 'center',       // Centrar cada carta horizontalmente
        marginLeft: '200px',
    },
    card: {
        backgroundColor: '#f0f0f0',
        // padding: '20px',
        width: '280px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        borderRadius: '10px',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
    },
    imageContainer: {
        flex: '1 1 auto', // Sección superior que toma toda la altura posible
        height: '150px', // Fija la altura del contenedor para la imagen
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '10px',
        overflow: 'hidden', // Asegura que la imagen no desborde el contenedor
    },
    image: {
        width: '100%',
        height: '100%',
        objectFit: 'cover', // Mantener la proporción y cubrir todo el contenedor
        borderTopLeftRadius: '15px',   // Borde redondeado en la esquina superior izquierda
        borderTopRightRadius: '15px',  // Borde redondeado en la esquina superior derecha
    },
    infoContainer: {
        flex: '0 1 auto', // Sección inferior
        paddingTop: '10px',
    }
};

export default CardProject;
