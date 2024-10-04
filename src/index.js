// index.js
import React from 'react';
import { createRoot } from 'react-dom/client';
import injectContext from './controllers/appContext'; // Importamos injectContext
import PaymentsProvider from './context/paymentsContext.jsx';
import ProjectsProvider  from './context/projectsContext.jsx';
import Layout from './layout.js';
import './styles/App.css'

const container = document.getElementById('root');
const root = createRoot(container);

// Envolvemos Layout con injectContext
const LayoutWithContext = injectContext(Layout);

root.render(
  <React.StrictMode>
    <ProjectsProvider >
      <PaymentsProvider>
        <LayoutWithContext />
      </PaymentsProvider>
    </ProjectsProvider >
  </React.StrictMode>
);
