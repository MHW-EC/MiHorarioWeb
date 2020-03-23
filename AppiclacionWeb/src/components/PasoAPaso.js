import React from 'react';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import OpcionesMaterias from "./paso3/opciones-materias";
import SearchCarrera from './paso1/SearchCarrera'
import Horarios from "./paso4/horarios";
import Malla from './paso2/Malla';
import { Container } from '@material-ui/core';

//Aqui seteamos estilos
const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    backgroundColor: '#282c34',
    color: '#fff'
  },
  backButton: {
    color: '#ffffff',
    marginRight: theme.spacing(1),
    border: '1px solid #ffffff',
  },
  backButtonDissabled: {
    color: '#ffffff',
    marginRight: theme.spacing(1),
    border: '1px solid #222222',
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  label: {
    color: '#ffffff'
  }
}));

//Esto no ayuda a obtener los pasos a seguir
function getSteps() {
  return ['Busque su carrera', 'Seleccion de materias', 'Seleccion de paralelos', 'Horarios generados'];
}
//Esto nos devuelve informacion adicional de paso
function getStepContent(stepIndex) {
  switch (stepIndex) {
    case 0:
      return 'En la entrada de texto ingrese el nombre de su carrera';
    case 1:
      return 'Seleccione las materias que desea ver en el semestre';
    case 2:
      return 'De cada materia previamente escogidas, seleccione los paralelos de su interés';
    case 3:
      return 'A continuación se presentan los horarios generados. Puede ver más detalles en el botón <nombre aqui> y descargarlos con el botón <nombre aqui>';
    default:
      return 'Unknown stepIndex';
  }
}





export default function PasoAPaso() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };
  //Esto nos devuelve el componente del paso segun el paso en el que estamos
  function getStepComponet(stepIndex){
    switch(stepIndex){
      case 0:
        return <SearchCarrera/>
      case 1:
        return <Malla/>
      case 2:
        return <OpcionesMaterias/>
      case 3:
        return <Horarios/>
      default:
        return <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
    }
  }

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} alternativeLabel className={classes.root}>
        {steps.map(label => (
          <Step key={label} >
            <StepLabel>
              <Typography className={classes.label}>
                {label}
              </Typography>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
      <Container maxWidth='lg'>
        {getStepComponet(activeStep)}
      </Container>
        {activeStep === steps.length - 1 ? (
          <div>
          <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
          <div>
            <Button
              variant="contained"
              color="primary"
              disabled={activeStep === 0}
              onClick={handleBack}
              className={classes.backButton}
            >
              Atrás
            </Button>

          </div>
        </div>
        ) : (
          <div>
            <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
            <div>
              <Button
                contained
                disabled={activeStep === 0}
                onClick={handleBack}
                className={activeStep === 0 ? classes.backButtonDissabled :classes.backButton}
              >
                Atrás
              </Button>
              <Button variant="contained" color="primary" onClick={handleNext}>
                {activeStep === steps.length - 2 ? 'Siguiente' : 'Siguiente'}
              </Button>
            </div>
          </div>
        )}
      </div>
      
    </div>
  );
}
