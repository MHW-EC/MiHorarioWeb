import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#AAF1FC',
      main: '#1665A6',
      dark: '#0D4583',
      contrastText: '#ffffff',
    },
    secondary: {
      light: '#FDDFAD',
      main: '#f48c32',
      dark: '#8D360F',
      contrastText: '#ffffff',
    },
    error: {
      light: '#c4414b',
      main: '#8e0023',
      dark: '#5a0000',
      contrastText: '#ffffff',
    },
    warning: {
      light: '#f3a34b',
      main: '#bc741b',
      dark: '#874800',
      contrastText: '#ffffff',
    },
    success: {
      light: '#5ccb8c',
      main: '#21995e',
      dark: '#006a33',
      contrastText: '#ffffff',
    },
    info: {
      light: '#6f9dff',
      main: '#326fcc',
      dark: '#00459a',
      contrastText: '#ffffff',
    },
    background: {
      paper: '#fff',
      default: '#fafafa',
    },
  },
});
const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      light: '#AAF1FC',
      main: '#1665A6',
      dark: '#0D4583',
      contrastText: '#ffffff',
    },
    secondary: {
      light: '#FDDFAD',
      main: '#f48c32',
      dark: '#8D360F',
      contrastText: '#ffffff',
    },
    error: {
      light: '#c4414b',
      main: '#8e0023',
      dark: '#5a0000',
      contrastText: '#ffffff',
    },
    warning: {
      light: '#f3a34b',
      main: '#bc741b',
      dark: '#874800',
      contrastText: '#ffffff',
    },
    success: {
      light: '#5ccb8c',
      main: '#21995e',
      dark: '#006a33',
      contrastText: '#ffffff',
    },
    info: {
      light: '#6f9dff',
      main: '#326fcc',
      dark: '#00459a',
      contrastText: '#ffffff',
    },
    background: {
      paper: '#333333',
      default: '#212121',
    },
  },
});
export { theme, darkTheme };
