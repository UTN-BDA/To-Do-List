import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProvider, createTheme } from '@mui/material/styles'; // 👉 agrega esto

const theme = createTheme(); // 👉 crea un tema básico

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}> {/* 👉 envuelve todo */}
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
