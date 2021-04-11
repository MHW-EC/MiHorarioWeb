import { BrowserRouter as Router, Route } from 'react-router-dom';
import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {
  AppBar,
  Zoom,
  Toolbar,
  Fab,
  Typography,
  Paper,
  Container,
  IconButton
}from '@material-ui/core';
import { 
  makeStyles,
  withStyles,
  ThemeProvider,
} from '@material-ui/core/styles';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import PasoAPaso from './pages/PasoAPaso';
import Notifier from './components/Notifier';
import AnimatedDialog from './components/inicio/animated-dialog';
import InfoDialog from './components/inicio/info-dialog';
import DisclaimerDialog from './components/inicio/disclaimer-dialog';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import { SnackbarProvider } from 'notistack';
import { theme, darkTheme } from './theme';


function ElevationScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}
const StyledPaper = withStyles((theme) => ({
  root: {
    minHeight: "1000px",
    backgroundColor: theme.palette.background.default,
  },
}))(Paper);

const useStyles = makeStyles((theme) => ({
  zoom: {
    backgroundColor: 'transparent',
    position: 'fixed',
    bottom: theme.spacing(5),
    right: theme.spacing(5),
  },
  icon: {
    marginLeft: 'auto',
    marginRight: theme.spacing(1),
  },
  divInfo: {
    marginRight: 0,
    marginLeft: 'auto',
  },
  divLine: {
    display: 'inline-block',
  },
}));

function ScrollTop(props) {
  const { children, window } = props;
  const classes = useStyles();
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      '#back-to-top-anchor'
    );
    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <Zoom in={trigger}>
      <div onClick={handleClick} role="presentation" className={classes.zoom}>
        {children}
      </div>
    </Zoom>
  );
}

ElevationScroll.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func,
};
function App(props) {
  const classes = useStyles();
  const [isThemeLight, setTheme] = useState(true);
  const [initTheme, setInitTheme] = useState(false);
  const themeButtonHandler = () => {
    setTheme(!isThemeLight);
  };
  
  const [resfresh, setResfresh] = useState(true);

  useEffect(() => {
    if (resfresh) {
      const counterPost = (name) => {
        fetch(
          'https://cors-anywhere.herokuapp.com/https://server-count-views.herokuapp.com/updateViews?key=visit_page',
          {
            method: 'POST',
          }
        )
          .then((response) => response.json())
          //.then(console.log);
      };

      counterPost();
      setResfresh(false);
    }
  }, [resfresh]);

  useEffect(() => {
    if (!initTheme) {
      //console.log('Seeing theme');
      if (
        window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches
      ) {
        setTheme(false);
      }
      window
        .matchMedia('(prefers-color-scheme: dark)')
        .addEventListener('change', (e) => {
          if (e.matches) {
            setTheme(false);
          } else {
            setTheme(true);
          }
        });
      setInitTheme(true);
    }
  }, [isThemeLight, initTheme]);

  return (
    <>
      <ThemeProvider theme={isThemeLight ? theme : darkTheme}>
        <SnackbarProvider>
          <StyledPaper elevation={0} square className={classes.root}>
            <Notifier />
            <div id="back-to-top-anchor" />
            <AppBar position="sticky">
              <Toolbar>
                <Typography variant="h6">Mi Horario Web</Typography>
                <div className={classes.divInfo}>
                  <div className={classes.divLine}>
                    <AnimatedDialog
                      open={true}
                      titulo={<DisclaimerDialog.Titulo />}
                      contenido={<DisclaimerDialog.Contenido />}
                      actions={(handle) => (
                        <DisclaimerDialog.Actions handle={handle} />
                      )}
                    >
                      {(handle) => (
                        <DisclaimerDialog.Controlador handle={handle} />
                      )}
                    </AnimatedDialog>
                  </div>
                  <div className={classes.divLine}>
                    <IconButton
                      aria-label="show 4 new mails"
                      color="inherit"
                      className={classes.icon}
                      onClick={themeButtonHandler}
                    >
                      {isThemeLight ? <Brightness4Icon /> : <Brightness7Icon />}
                    </IconButton>
                  </div>

                  <div className={classes.divLine}>
                    <AnimatedDialog
                      open={false}
                      titulo={<InfoDialog.Titulo />}
                      contenido={<InfoDialog.Contenido />}
                      actions={(handle) => (
                        <InfoDialog.Actions handle={handle} />
                      )}
                    >
                      {(handle) => <InfoDialog.Controlador handle={handle} />}
                    </AnimatedDialog>
                  </div>
                </div>
              </Toolbar>
            </AppBar>
            <Container maxWidth="xl">
              <Router>
                <Route exact path="/" component={PasoAPaso} />
              </Router>
            </Container>
            <ScrollTop {...props}>
              <Fab
                color="secondary"
                size="small"
                aria-label="scroll back to top"
              >
                <KeyboardArrowUpIcon />
              </Fab>
            </ScrollTop>
          </StyledPaper>
        </SnackbarProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
