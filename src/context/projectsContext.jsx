import React, { createContext, useState, useEffect } from 'react';

// Crear el contexto
export const ProjectsContext = createContext();

// Crear el proveedor del contexto
const ProjectsProvider = ({ children }) => {
    const [projects, setProjects] = useState([]);
    const [lots, setLots] = useState([]); // Estado para almacenar los lotes

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await fetch('http://100.42.184.197/api/v1/dataproject/');
                const data = await response.json();
                setProjects(data);
            } catch (error) {
                console.error('Error al obtener los proyectos:', error);
            }
        };

        fetchProjects();
    }, []);

    // Función para obtener los lotes disponibles basado en el proyecto seleccionado
    const fetchLots = async (project) => {
        try {
            const response = await fetch('http://100.42.184.197/api/v1/get_lotes_libres/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ proyecto: project }),
            });
            const data = await response.json();
            setLots(data); // Almacenar los lotes recibidos
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
