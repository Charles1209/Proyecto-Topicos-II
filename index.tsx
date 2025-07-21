import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './App';
import { AuthProvider } from './context/AuthContext'; // Paso 1: Importar el AuthProvider

const rootElement = document.getElementById('root');
if (!rootElement) {
throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
<React.StrictMode>
    {/* Paso 2: Envolver toda la aplicación con el AuthProvider */}
    <AuthProvider>
    <HashRouter>
        <App />
    </HashRouter>
    </AuthProvider>
</React.StrictMode>
);
