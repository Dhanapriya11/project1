import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Import Premium Design System
import './styles/premium-design-system.css';

// Create root and render
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);