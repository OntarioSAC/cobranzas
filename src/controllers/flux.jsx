const getState = ({ setStore }) => {
  return {
    store: {
      clients: [],
      staffMembers: [], // Datos del staff
      user: null,
      isLoadingClients: false,
    },
    actions: {
      // Cargar Staff desde la API
      loadStaff: async () => {
        try {
          const response = await fetch('http://100.42.184.197/api/v1/personastaff/');
          if (!response.ok) {
            throw new Error(`Error al cargar el staff: ${response.statusText}`);
          }
          const data = await response.json();
          setStore({ staffMembers: data });
        } catch (error) {
          console.error('Error al cargar el staff:', error);
        }
      },

      loadClients: async () => {
        try {
          setStore({ isLoadingClients: true });
          const response = await fetch('http://100.42.184.197/api/v1/dataclient/');
          if (!response.ok) {
            throw new Error(`Error al cargar los clientes: ${response.statusText}`);
          }
          const data = await response.json();
          setStore({ clients: data });
          console.log(data)
        } catch (error) {
          console.error('Error loading clients:', error);
        } finally {
          setStore({ isLoadingClients: false });
        }
      },

      
    },
  };
};

export default getState;
