import { pxToRem } from './utils/pxToRem';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: ['Roboto', 'sans-serif'].join(','),
  },
  components: {
    MuiBackdrop: {
      styleOverrides: {
        root: {
          // backgroundColor: 'rgba(0,0,0,0.6)',
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        '@global': {
          html: {
            boxSizing: 'border-box',
            width: '100%',
            height: '100%',
          },
          'html, body': {
            outline: 'none',
          },
          body: {
            margin: '0 auto',
          },
          '#root': {
            minHeight: '100%',
            height: '100vh',
            width: '100%',
          },
          ':focus': {
            outline: 'none',
          },
          a: {
            textDecoration: 'none !important',
          },
        },
      },
    },
  },
});

export default theme;
