import React from 'react';
import Chart from '../components/chart.jsx';
import ClientMedition from '../components/clientMedition.jsx';

const Home = () => {

  return (
    <div style={{marginLeft:'15%'}}>
      <Chart />
      <ClientMedition/>
    </div>
  );
};

export default Home;
