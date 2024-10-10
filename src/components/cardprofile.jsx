import React, { useContext } from 'react';
import { UserContext } from '../context/userContext.jsx'; // Importa el UserContext

const CardProfile = () => {
  const { user } = useContext(UserContext); // Obtiene los datos del usuario desde el contexto

  const styles = {
    dashboardCard: {
      background: 'linear-gradient(135deg, #1a2e50, #3b5998)',
      borderRadius: '15px',
      padding: '20px',
      color: 'white',
      width: '350px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
      margin: '20px',
    },
    dashboardCardTitle: {
      fontSize: '18px',
      marginBottom: '15px',
    },
    highlightText: {
      color: '#cbf000', // Color verde similar al de la imagen
    },
    monthsContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      margin: '20px 0',
    },
    month: {
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      borderRadius: '8px',
      padding: '10px',
      textAlign: 'center',
      flex: '1',
      margin: '5px',
      color: 'rgba(255, 255, 255, 0.7)',
      minWidth: '50px',
    },
    monthHighlight: {
      backgroundColor: '#cbf000', // Color resaltado para el mes actual
      color: '#1a2e50', // Texto azul oscuro
      borderRadius: '8px',
      padding: '10px',
      textAlign: 'center',
      flex: '1',
      margin: '5px',
      fontWeight: 'bold',
      minWidth: '50px',
    },
    salesInfo: {
      marginTop: '20px',
    },
    salesAmount: {
      fontSize: '18px',
      fontWeight: 'normal',
      color: '#ffffff',
    },
    salesSubtext: {
      fontSize: '14px',
      color: 'rgba(255, 255, 255, 0.7)',
    },
  };

  // Función para formatear el nombre del usuario con la primera letra en mayúscula y el resto en minúsculas
  const formatName = (name) => {
    if (!name) return 'Usuario'; // Valor por defecto si el nombre no está disponible
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  };

  // Obtén el nombre del usuario formateado
  const userName = formatName(user?.persona_staff?.nombres);

  // Obtén el área del usuario
  const userArea = user?.persona_staff?.area || 'Área no disponible';

  // Array con los meses abreviados
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  // Obtener el mes actual
  const currentMonth = new Date().getMonth(); // Devuelve un valor entre 0 y 11, donde 0 es enero y 11 es diciembre

  return (
    <div style={styles.dashboardCard}>
      <h2 style={styles.dashboardCardTitle}>
        Hola {userName}, <span style={styles.highlightText}>Bienvenido</span> a Ontario 
      </h2>

      <div style={styles.monthsContainer}>
        {months.map((month, index) => (
          <div
            key={index}
            style={index === currentMonth ? styles.monthHighlight : styles.month} // Resaltar el mes actual
          >
            {month}
          </div>
        ))}
      </div>

      <div style={styles.salesInfo}>
        <p style={styles.salesAmount}>Área: {userArea}</p>
      </div>
    </div>
  );
};

export default CardProfile;
