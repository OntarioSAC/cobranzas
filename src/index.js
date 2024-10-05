// index.js
import React from 'react';
import { createRoot } from 'react-dom/client';

import UserProvider from './context/userContext';

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
    <UserProvider>
      <ProjectsProvider >
        <PaymentsProvider>
          <LayoutWithContext />
        </PaymentsProvider>
      </ProjectsProvider >
    </UserProvider>
  </React.StrictMode>
);
