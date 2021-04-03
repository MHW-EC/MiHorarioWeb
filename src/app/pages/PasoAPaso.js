import React, { useEffect } from 'react';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import OpcionesMaterias from '../components/paso3/opciones-materias';
import SearchCarrera from '../components/paso1/SearchCarrera';
import TablaVisor from '../components/paso4/tabla-visor';
import Malla from '../components/paso2/Malla';
import { Grid } from '@material-ui/core';
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
import {constants as APPCONSTANTS} from './../constants';

const useStyles = makeStyles((theme) => ({
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  divCenter: {
    marginRight: 'auto',
    marginLeft: 'auto',
  },
  divItem: {
    display: 'inline-block',
    marginRight: theme.spacing(1),
  },
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

  const btnCerrar = (
    <Typography style={{ color: '#ffffff' }}>| Cerrar</Typography>
  );

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
                <Button onClick={() => closeSnackbar(key)}>{btnCerrar} </Button>
              ),
            },
          });
        }
        break;
      case 1:
        let materiasMSelected = materiasMalla.filter((materia) => materia.check);
        let materiasSSelected = materiasSelect.filter((materia) => materia.check);
        let noMMSelected = materiasMSelected ? materiasMSelected.length : 0;
        let noMSSelected = materiasSSelected ? materiasSSelected.length : 0;
        let materiasTotal = noMMSelected + noMSSelected;

        let noMateriasSelected = materiasTotal === 0;
        let exceededMateriasAllowed = materiasTotal > APPCONSTANTS['materiasMaxNumber'];
        
        if (noMateriasSelected || exceededMateriasAllowed) {
          error = true;
          enqueueSnackbar({
            message: noMateriasSelected
              ? 'No se han seleccionado materias'
              : exceededMateriasAllowed 
              ? `Ha excedido el número máximo de materias: ${APPCONSTANTS['materiasMaxNumber']}`
              : "Error, por favor inténtelo de nuevo",
            options: {
              preventDuplicate: true,
              key: new Date().getTime() + Math.random(),
              variant: 'error',
              action: (key) => (
                <Button onClick={() => closeSnackbar(key)}>{btnCerrar} </Button>
              ),
              style: { whiteSpace: 'pre-line', textAlign: 'left' },
            },
          });
        }
        break;
      case 2:
        let noTeoricosSelected = seleccionados.length === 0;
        let noPracticoSelected = paqueteria.length === 0;
        let exceededTeoricoSelected = seleccionados.length > APPCONSTANTS['teoricosMaxNumber'];
        let exceededPracticoSelected = paqueteria.length > APPCONSTANTS['practicosMaxNumber'];
        if (noTeoricosSelected || noPracticoSelected || exceededTeoricoSelected || exceededPracticoSelected) {
          error = true;
          enqueueSnackbar({
            message: noTeoricosSelected 
              ? 'No se han seleccionado paralelos teóricos'
              : noPracticoSelected
              ? 'No se han seleccionado paralelos asociados (prácticos)'
              : exceededTeoricoSelected
              ? `Ha excedido el número máximo de paralelos teóricos: ${APPCONSTANTS['teoricosMaxNumber']}`
              : exceededPracticoSelected
              ? `Ha excedido el número máximo de paralelos asociados (prácticos): ${APPCONSTANTS['practicosMaxNumber']}`
              : 'Error, inténtelo de nuevo',
            options: {
              preventDuplicate: true,
              key: new Date().getTime() + Math.random(),
              variant: 'error',
              action: (key) => (
                <Button onClick={() => closeSnackbar(key)}>{btnCerrar} </Button>
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
                <Button onClick={() => closeSnackbar(key)}>{btnCerrar} </Button>
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
          <Typography className={classes.instructions} color="textSecondary">
            {getStepContent(activeStep)}
          </Typography>
        );
    }
  }

  return (
    <div className={classes.root}>
      <Stepper
        activeStep={activeStep}
        alternativeLabel
        style={{ backgroundColor: 'transparent' }}
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
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography className={classes.instructions} color="textSecondary">
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
    </div>
  );
}
