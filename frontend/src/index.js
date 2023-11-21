import React from 'react';
import ReactDOM from 'react-dom/client';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import { BrowserRouter } from "react-router-dom";
import App from './App';

const theme = createTheme({
  spacing: 8,
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <StyledEngineProvider injectFirst>
    <ThemeProvider theme={theme}>
      <React.StrictMode>
        <BrowserRouter>
          <CssBaseline />
          <App />
        </BrowserRouter>
      </React.StrictMode>
    </ThemeProvider>
  </StyledEngineProvider>
);

