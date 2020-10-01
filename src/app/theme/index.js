import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#3e7683',
      main: '#E6920D',
      dark: '#00222d',
      contrastText: '#ffffff',
    },
    secondary: {
      light: '#c04c2f',
      main: '#891b05',
      dark: '#570000',
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
      default: '#fafafa'
    }
  },
});
const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      light: '#9fd6e5',
      main: '#E6920D',
      dark: '#3e7683',
      contrastText: '#ffffff',
    },
    secondary: {
      light: '#e6ab9c',
      main: '#b37c6e',
      dark: '#824f43',
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
      default: '#212121'
    }
  },
});
export { theme, darkTheme };