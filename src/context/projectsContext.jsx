import React, { createContext, useState, useEffect } from 'react';

// Crear el contexto
export const ProjectsContext = createContext();

// Crear el proveedor del contexto
const ProjectsProvider = ({ children }) => {
    const [projects, setProjects] = useState([]);
    const [lots, setLots] = useState([]); // Inicializar como un array vacío

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await fetch('http://100.42.184.197/api/v1/dataproject/');
                const data = await response.json();
                setProjects(data);
                console.log(data)
            } catch (error) {
                console.error('Error al obtener los proyectos:', error);
            }
        };

        fetchProjects();
    }, []);

    const fetchLots = async (projectName) => {
        try {
            // Asegurarse de que no hay espacios adicionales
            const trimmedProjectName = projectName.trim();
            console.log('Nombre del proyecto enviado a la API:', trimmedProjectName);
    
            const response = await fetch('http://100.42.184.197/api/v1/get_lotes_libres/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ proyecto_nombre: trimmedProjectName }), // Enviar solo el nombre del proyecto con formato correcto
            });
    
            const data = await response.json();
            console.log('Respuesta de la API:', data);
    
            if (Array.isArray(data)) {
                setLots(data); // Solo asignar si data es un array
            } else {
                setLots([]); // Si no es un array, asignar un array vacío
                console.error('La respuesta de la API no es un array:', data);
            }
        } catch (error) {
            console.error('Error al obtener los lotes:', error);
        }
    };
    

    return (
        <ProjectsContext.Provider value={{ projects, lots, fetchLots }}>
            {children}
        </ProjectsContext.Provider>
    );
};

export default ProjectsProvider;
