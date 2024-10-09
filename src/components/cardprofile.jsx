import React from 'react';

const CardProfile = () => {
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
      margin: '20px 0',
    },
    month: {
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      borderRadius: '8px',
      padding: '10px',
      textAlign: 'center',
      flex: '1',
      margin: '0 5px',
      color: 'rgba(255, 255, 255, 0.7)',
    },
    monthHighlight: {
      backgroundColor: '#cbf000', // Color resaltado para el mes actual
      color: '#1a2e50', // Texto azul oscuro
      borderRadius: '8px',
      padding: '10px',
      textAlign: 'center',
      flex: '1',
      margin: '0 5px',
      fontWeight: 'bold',
    },
    salesInfo: {
      marginTop: '20px',
    },
    salesAmount: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#ffffff',
    },
    salesSubtext: {
      fontSize: '14px',
      color: 'rgba(255, 255, 255, 0.7)',
    },
  };

  return (
    <div style={styles.dashboardCard}>
      <h2 style={styles.dashboardCardTitle}>
        Hi Mike, <span style={styles.highlightText}>here's</span> what's happening in your stores.
      </h2>

      <div style={styles.monthsContainer}>
        {['may', 'jun', 'jul', 'aug', 'sep'].map((month, index) => (
          <div key={index} style={styles.month}>{month}</div>
        ))}
        <div style={styles.monthHighlight}>oct</div>
      </div>

      <div style={styles.salesInfo}>
        <p style={styles.salesAmount}>$ 331,224.74</p>
        <p style={styles.salesSubtext}>That's $32,459.46 more than this time last month!</p>
      </div>
    </div>
  );
};

export default CardProfile;
