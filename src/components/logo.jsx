import React from 'react';
import logo from '../assests/img/logodarkbackground.png'; // Ruta de tu logo

const Logo = () => {
  const logoStyle = {
    width: '90px', // Ajustar el tamaño del logo según tus necesidades
  };

  return <img src={logo} alt="Logo" style={logoStyle} />;
};

export default React.memo(Logo); // Memorizar el componente para evitar renderizados innecesarios
