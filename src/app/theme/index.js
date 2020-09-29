import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
        type: "dark",
        primary: {
          light: '#366067',
          main: '#05363d',
          dark: '#001117',
          contrastText: '#ffffff',
        },
        secondary: {
          light: '#6b352e',
          main: '#3d0c05',
          dark: '#220000',
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
      },
});
export default theme;