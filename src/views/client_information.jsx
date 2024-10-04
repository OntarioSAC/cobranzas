import React, { useContext, useEffect } from 'react';
import Table from '../components/table.jsx';
import { Context } from '../controllers/appContext.jsx'; // Importa tu context

const ClienteInformation = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.loadClients(); // Cargar los clientes al montar el componente
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Dejar el array de dependencias vacío



  return (
    <div >
      {store.isLoadingClients ? (
        <p>Cargando clientes...</p> // Vista de cargando mientras se obtienen los datos
      ) : (
        <Table data={store.clients} /> // Renderizar la tabla con los datos obtenidos
      )}

    </div>
  );
};

export default ClienteInformation;
