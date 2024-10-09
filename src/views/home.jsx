import React from 'react';
// import Chart from '../components/chart.jsx';
// import ClientMedition from '../components/clientMedition.jsx';
import CardProfile from '../components/cardprofile.jsx'; // Importamos el nuevo componente

const Home = () => {
  return (
    <div>
      <CardProfile /> {/* Añadimos el componente DashboardCard aquí */}
      {/* <Chart />
      <ClientMedition /> */}
    </div>
  );
};

export default Home;
