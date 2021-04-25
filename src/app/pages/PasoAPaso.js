import React, { useEffect } from 'react';
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  Grid
} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import OpcionesMaterias from '../components/paso3/opciones-materias';
import SearchCarrera from '../components/paso1/SearchCarrera';
import TablaVisor from '../components/paso4/tabla-visor';
import Malla from '../components/paso2/Malla';
import { useDispatch, useSelector } from 'react-redux';
import { cleanCarrera } from '../../redux/actions/carrera';
import { cleanMaterias } from '../../redux/actions/materias';
import { carreraSeleccionada as carreraSelector } from '../../redux/selectors';
import { cleanSel } from '../../redux/actions/seleccionados';
import { cleanPaquetes } from '../../redux/actions/paquetes';
import { cleanResultados } from '../../redux/actions/generador';
import { materiasSeleccionadas as matSelSelector } from '../../redux/selectors';
import { materiasMalla as mallaSelSelector } from '../../redux/selectors';
import {
  paqueteria as paqSelector,
  seleccionados as selecSelector,
} from '../../redux/selectors';

import {
  enqueueSnackbar as enqueueSnackbarAction,
  closeSnackbar as closeSnackbarAction,
} from '../../redux/actions/notifier';

const useStyles = makeStyles((theme) => ({
  instructions: {
    margin: '0px'
  },
  divCenter: {
    marginRight: 'auto',
    marginLeft: 'auto',
  },
  divItem: {
    display: 'inline-block',
    marginRight: theme.spacing(1),
  },
  stepper: {
    backgroundColor: 'transparent',
    paddingTop: '24px',
    paddingRight: '0px',
    paddingLeft: '0px',
    paddingBottom: '12px',
  }
}));

function getSteps() {
  return ['Carrera', 'Materias', 'Paralelos', 'Resultados'];
}
function getStepContent(stepIndex) {
  switch (stepIndex) {
    case 0:
      return 'Elija una carrera';
    case 1:
      return 'Elija sus materias';
    case 2:
      return 'Elija sus paralelos teóricos y prácticos';
    case 3:
      return 'Sus posibles horarios son';
    default:
      return 'Unknown stepIndex';
  }
}

export default function PasoAPaso() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [isMobile, setMobile] = React.useState(5);

  const dispatch = useDispatch();

  const enqueueSnackbar = (...args) => dispatch(enqueueSnackbarAction(...args));
  const closeSnackbar = (...args) => dispatch(closeSnackbarAction(...args));

  const carrera = useSelector((state) => carreraSelector(state));

  const materiasSelect = useSelector((state) => matSelSelector(state));
  const materiasMalla = useSelector((state) => mallaSelSelector(state));

  const seleccionados = useSelector((state) => selecSelector(state));
  const paqueteria = useSelector((state) => paqSelector(state));

  useEffect(() => {
    const detectMobile = async () => {
      let response = await fetch('/isMobile');
      if (response.ok) {
        let res = await response.json();
        let link = res.ruta;
        res = res.redirigir;
        if (!res) {
          res = res.data;
          setMobile(res !== null);
          if (
            res !== undefined &&
            (res === 'iOS' || res.toLowerCase().slice(0, 3) === 'mac')
          ) {
            enqueueSnackbar({
              message:
                'Recomendados de un dispositivo \nque use un SO diferente a MacOS o iOS',
              options: {
                persist: true,
                preventDuplicate: true,
                key: new Date().getTime() + Math.random(),
                variant: 'warning',
                style: {
                  whiteSpace: 'pre-line',
                  textAlign: 'left',
                  color: '#000000',
                },
                action: (key) => <p></p>,
              },
            });
          }
        } else {
          let resRedir = await fetch('/redirigir');
          resRedir = await resRedir.json();

          if (resRedir.permiso) {
            window.location.replace(link);
          } else {
            alert(
              'Ambas servidores (Heroku y Azure) están copados de solicitudes, intente ingresar luego de unos minutos'
            );
          }
        }
      }
    };
    if (isMobile === 5) {
      detectMobile();
    }
  });

  const handleNext = () => {
    let error = false;
    switch (activeStep) {
      case 0:
        if (Object.keys(carrera).length === 0) {
          error = true;
          enqueueSnackbar({
            message: 'No se ha seleccionado una carrera',
            options: {
              preventDuplicate: true,
              key: new Date().getTime() + Math.random(),
              variant: 'error',
              action: (key) => (
                <Button onClick={() => closeSnackbar(key)}>Cerrar </Button>
              ),
            },
          });
        }
        break;
        case 1:
          let validacion = !(
            materiasMalla.find((materia) => materia.check) ||
            materiasSelect.find((materia) => materia.check)
          );
          if (validacion) {
            error = true;
            enqueueSnackbar({
              message: isMobile
                ? 'No se han seleccionado materias'
                : 'No se han seleccionado materias.\nPresione el checkbox a lado del nombre de la materia para añadir una',
              options: {
                preventDuplicate: true,
                key: new Date().getTime() + Math.random(),
                variant: 'error',
                action: (key) => (
                  <Button onClick={() => closeSnackbar(key)}>Cerrar </Button>
                ),
                style: { whiteSpace: 'pre-line', textAlign: 'left' },
              },
            });
          }
          break;
        case 2:
          if (paqueteria.length === 0) {
            error = true;
            enqueueSnackbar({
              message: isMobile
                ? 'No se han seleccionado paralelos Asociados (Prácticos)'
                : 'No se han seleccionado paralelos Asociados (Prácticos). \nPresione el botón "Par Asociados" para añadirlos',
              options: {
                preventDuplicate: true,
                key: new Date().getTime() + Math.random(),
                variant: 'error',
                action: (key) => (
                  <Button onClick={() => closeSnackbar(key)}>Cerrar </Button>
                ),
                style: { whiteSpace: 'pre-line', textAlign: 'left' },
              },
            });
          } else if (seleccionados.length === 0) {
            error = true;
            enqueueSnackbar({
              message: isMobile
                ? 'No se han seleccionado paralelos Teóricos'
                : 'No se han seleccionado paralelos Teóricos. \nPresione el botón en la esquina superior izquierda de un paralelo para añadirlo',
              options: {
                preventDuplicate: true,
                key: new Date().getTime() + Math.random(),
                variant: 'error',
                action: (key) => (
                  <Button onClick={() => closeSnackbar(key)}>Cerrar </Button>
                ),
                style: { whiteSpace: 'pre-line', textAlign: 'left' },
              },
            });
          }
          break;
        default:
          return;
    }
    if (!error) setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    switch (activeStep) {
      case 1:
        dispatch(cleanCarrera());
        dispatch(cleanMaterias());
        break;
      case 2:
        dispatch(cleanSel());
        dispatch(cleanPaquetes());
        break;
      case 3:
        dispatch(cleanResultados());
        dispatch(cleanSel());
        dispatch(cleanPaquetes());
        break;
      default:
        break;
    }
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  function getStepComponet(stepIndex) {
    switch (stepIndex) {
      case 0:
        return <SearchCarrera />;
      case 1:
        return <Malla />;
      case 2:
        return <OpcionesMaterias />;
      case 3:
        return <TablaVisor />;
      default:
        return (
          <Typography 
            className={classes.instructions}
            color="textSecondary">
            {getStepContent(activeStep)}
          </Typography>
        );
    }
  }

  return (
    <>
      <Stepper
        className={classes.stepper}
        activeStep={activeStep}
        alternativeLabel
      >
        {getSteps().map((label) => (
          <Step key={label}>
            <StepLabel>
              <Typography className={classes.instructions} color="textPrimary">
                {label}
              </Typography>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
      <Grid container spacing={3} style={{margin: '0px'}}>
        <Grid item xs={12}>
          <Typography 
            className={classes.instructions} 
            color="textSecondary">
            {getStepContent(activeStep)}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <div className={classes.divCenter}>
            <div className={classes.divItem}>
              <Button
                variant="contained"
                disabled={activeStep === 0}
                onClick={handleBack}
              >
                Atrás
              </Button>
            </div>
            <div className={classes.divItem}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                disabled={activeStep === 3}
              >
                Siguiente
              </Button>
            </div>
          </div>
        </Grid>
        <Grid item xs={12}>
          {getStepComponet(activeStep)}
        </Grid>
      </Grid>
    </>
  );
}
