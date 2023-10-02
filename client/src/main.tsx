import React from 'react';
import ReactDOM from 'react-dom/client';
import { ErrorBoundary } from 'react-error-boundary';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import App from './components/App';
import ErrorBoundaryFallback from './components/ErrorBoundaryFallback';

class SignalRElement extends HTMLElement {
  constructor() {
    super();
    this.setAttribute('id', 'signalr-root'); // Setting an attribute
  }
}
// Register the custom element
customElements.define('signalr-component', SignalRElement);

const container = document.querySelector('#signalr-root');
const shadowContainer = container?.attachShadow({ mode: 'open' });
const emotionRoot = document.createElement('style');
const shadowRootElement = document.createElement('div');
shadowRootElement.setAttribute('id', 'react-root');
shadowContainer?.appendChild(emotionRoot);
shadowContainer?.appendChild(shadowRootElement);

const cache = createCache({
  key: 'css',
  prepend: true,
  container: emotionRoot,
});

const shadowTheme = createTheme({
  palette: {
    primary: {
      main: '#1D3967',
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'Roboto',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    fontSize: 16,
  },
  components: {
    MuiPopover: {
      defaultProps: {
        container: shadowRootElement,
      },
    },
    MuiPopper: {
      defaultProps: {
        container: shadowRootElement,
      },
    },
    MuiModal: {
      defaultProps: {
        container: shadowRootElement,
      },
    },
  },
});

ReactDOM.createRoot(shadowRootElement as HTMLElement).render(
  <React.StrictMode>
    <CacheProvider value={cache}>
      <ThemeProvider theme={shadowTheme}>
        <CssBaseline />
        <ErrorBoundary fallback={<ErrorBoundaryFallback />}>
          <App />
        </ErrorBoundary>
      </ThemeProvider>
    </CacheProvider>
  </React.StrictMode>,
);
