const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            clients: [], // Lista de clientes
            projects: [], // Lista de proyectos
            payments: [], // Lista de pagos
            user: null, // Información de usuario
        },
        actions: {
            // Cargar clientes desde la API
            loadClients: async () => {
                try {
                    const response = await fetch('http://100.42.184.197/api/v1/dataclient/');
                    if (!response.ok) {
                        throw new Error(`Error al cargar los clientes: ${response.statusText}`);
                    }
                    const data = await response.json();
                    setStore({ clients: data });
                } catch (error) {
                    console.error("Error loading clients:", error);
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
            },

            // Cargar pagos
            loadPayments: async () => {
                try {
                    const response = await fetch('/api/payments');
                    const data = await response.json();
                    setStore({ payments: data });
                } catch (error) {
                    console.error("Error loading payments:", error);
                }
            },

            // Manejar login de usuario
            login: (userData) => {
                setStore({ user: userData });
            },

            // Manejar logout de usuario
            logout: () => {
                setStore({ user: null });
            },

            // Actualizar un cliente en particular
            updateClient: (id, updatedData) => {
                const store = getStore();
                const updatedClients = store.clients.map(client =>
                    client.id === id ? { ...client, ...updatedData } : client
                );
                setStore({ clients: updatedClients });
            }
        }
    };
};

export default getState;
