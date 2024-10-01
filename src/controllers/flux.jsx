const getState = ({ getStore, getActions, setStore }) => {
    return {
      store: {
        clients: [], // Lista de clientes
        projects: [], // Lista de proyectos
        payments: [], // Lista de pagos
        user: null,   // Información de usuario
        isLoadingClients: false, // Indicador de carga para los clientes
      },
      actions: {
        // Cargar clientes desde la API
        loadClients: async () => {
          try {
            setStore({ isLoadingClients: true }); // Activar indicador de carga
            const response = await fetch('http://100.42.184.197/api/v1/dataclient/');
            if (!response.ok) {
              throw new Error(`Error al cargar los clientes: ${response.statusText}`);
            }
            const data = await response.json();
            setStore({ clients: data });
          } catch (error) {
            console.error("Error loading clients:", error);
          } finally {
            setStore({ isLoadingClients: false }); // Desactivar indicador de carga
          }
        },
  
        // Cargar proyectos
        loadProjects: async () => {
          try {
            const response = await fetch('/api/projects');
            const data = await response.json();
            setStore({ projects: data });
          } catch (error) {
            console.error("Error loading projects:", error);
          }
        }
      }
    };
  };
  
  export default getState;
  