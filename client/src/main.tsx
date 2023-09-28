import React from 'react';
import { createRoot } from 'react-dom/client';
import ReactDOM from 'react-dom/client';
import { ErrorBoundary } from 'react-error-boundary';
import { ThemeProvider } from '@mui/material/styles';
import { Box } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import toast, { Toaster } from 'react-hot-toast';
import theme from './theme';
import App from './components/App';
import { rootCertificates } from 'tls';

// const domElement = document.getElementById('root');

// const shadow = domElement?.attachShadow({ mode: 'open' });

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      {/* <CssBaseline /> */}
      <Toaster />
      <ErrorBoundary
        fallback={
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: 64,
              border: '1px solid #d32f2f',
              color: '#d32f2f',
            }}
          >
            Something went wrong with SignalR Connection!
          </Box>
        }
      >
        <App />
      </ErrorBoundary>
    </ThemeProvider>
  </React.StrictMode>,
);
