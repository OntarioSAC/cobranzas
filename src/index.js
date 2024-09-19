// index.js
import React from 'react';
import { createRoot } from 'react-dom/client';
import injectContext from './controllers/appContext'; // Importamos injectContext
import PaymentsProvider from './context/paymentsContext.jsx';
import Layout from './layout.js';

const container = document.getElementById('root');
const root = createRoot(container);

// Envolvemos Layout con injectContext
const LayoutWithContext = injectContext(Layout);

root.render(
  <React.StrictMode>
    <PaymentsProvider>
      <LayoutWithContext />
    </PaymentsProvider>
  </React.StrictMode>
);
