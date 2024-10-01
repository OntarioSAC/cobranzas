import React, { createContext, useState, useEffect } from 'react';

// Crear el contexto
export const ProjectsContext = createContext();

// Crear el proveedor del contexto
const ProjectsProvider = ({ children }) => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await fetch('http://100.42.184.197/api/v1/dataproject/');
                const data = await response.json();

                setProjects(data); // Ajusta esto según el formato de tu API
            } catch (error) {
                console.error('Error al obtener los proyectos:', error);
            }
        };

        fetchProjects();
    }, []);

    return (
        <ProjectsContext.Provider value={{ projects }}>
            {children}
        </ProjectsContext.Provider>
    );
};

export default ProjectsProvider;
