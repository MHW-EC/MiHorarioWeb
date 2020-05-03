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
import { Grid, Container } from '@material-ui/core';
import StepContent from '@material-ui/core/StepContent';
import { useDispatch } from 'react-redux';
import { cleanCarrera } from '../../redux/actions/carrera';
import { cleanMaterias, setMateriasMalla } from '../../redux/actions/materias';
import { cleanSel } from '../../redux/actions/seleccionados';
import { cleanPaquetes } from '../../redux/actions/paquetes';
import { cleanAsociados } from '../../redux/actions/asociado';
import { cleanResultados } from '../../redux/actions/generador';

//Aqui seteamos estilos
const useStyles = makeStyles((theme) => ({
	root: {
		//width: '100%',
		backgroundColor: '#ffffff',
		color: '#fff',
		spacing: theme.spacing(0),
	},
	backButton: {
		//color: 'primary',
		//marginRight: theme.spacing(1),
		//border: '1px solid #ffffff',
	},
	backButtonDissabled: {
		//color: 'primary',
		//marginRight: theme.spacing(1),
		//border: '1px solid #222222',
	},
	instructions: {
		marginTop: theme.spacing(1),
		marginBottom: theme.spacing(1),
	},
	label: {
		color: '#ffffff',
	},
	contButton: {
		'& > *': {
			margin: theme.spacing(1),
		},
	},
	pasoContainer: {
		padding: '10px 60px !important',
	},
}));

//Esto no ayuda a obtener los pasos a seguir
function getSteps() {
	return ['Carrera', 'Materias', 'Paralelos', 'Resultados'];
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
			return 'A continuación se presentan los horarios generados. Puede ver mas información sobre ellos dando click en el botón visualizar';
		default:
			return 'Unknown stepIndex';
	}
}

export default function PasoAPaso() {
	const classes = useStyles();
	const [activeStep, setActiveStep] = React.useState(0);
	const [isMobile, setMobile] = React.useState({});
	const [refresh] = React.useState(false);
	const dispatch = useDispatch();
	//const [carrera, setCarrera] = React.useState({});
	//const [materiasSelect, setMateriasSelect] = React.useState([]);

	const detectMobile = async () => {
		let response = await fetch('/isMobile');

		if (response.ok) {
			let res = await response.json();
			setMobile(res);
		}
	};

	useEffect(() => {
		detectMobile();
	}, [refresh]);

	const steps = getSteps();

	const handleNext = () => {
		//setNombreCarrera(document.getElementById('input-nombre-carrera').value);
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
	};

	const handleBack = () => {
		//setCarrera({});
		//setMateriasSelect([]);
		switch (activeStep) {
			case 1:
				dispatch(cleanCarrera());
				dispatch(cleanMaterias());
				break;
			case 2:
				//dispatch(cleanMaterias());
				dispatch(cleanSel());
				dispatch(cleanAsociados());
				dispatch(cleanPaquetes());
				break;
			case 3:
				dispatch(cleanResultados());
				dispatch(cleanSel());
				dispatch(cleanAsociados());
				dispatch(cleanPaquetes());
				break;
			default:
				break;
		}
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	const handleReset = () => {
		setActiveStep(0);
	};
	//Esto nos devuelve el componente del paso segun el paso en el que estamos
	function getStepComponet(stepIndex) {
		switch (stepIndex) {
			case 0:
				return <SearchCarrera />;
			case 1:
				return <Malla />;
			case 2:
				return <OpcionesMaterias isMobile={isMobile} />;
			//return <></>
			case 3:
				//return <></>
				return <TablaVisor />;
			default:
				return (
					<Typography className={classes.instructions} color='textSecondary'>
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
				className={classes.root}
			>
				{steps.map((label) => (
					<Step key={label}>
						<StepLabel>
							<Typography className={classes.instructions}>{label}</Typography>
						</StepLabel>
					</Step>
				))}
			</Stepper>
			<Grid container spacing={2}>
				<Grid item xs={12}>
					{activeStep === steps.length - 1 ? (
						<div>
							<Typography
								className={classes.instructions}
								color={'textSecondary'}
							>
								{getStepContent(activeStep)}
							</Typography>
							<div>
								<Button
									variant='contained'
									color='primary'
									disabled={activeStep === 0}
									onClick={handleBack}
									//className={classes.backButton}
								>
									Atrás
								</Button>
							</div>
						</div>
					) : (
						<div>
							<Typography
								className={classes.instructions}
								color={'textSecondary'}
							>
								{getStepContent(activeStep)}
							</Typography>
							<div className={classes.contButton}>
								<Button
									variant='contained'
									disabled={activeStep === 0}
									onClick={handleBack}
								>
									Atrás
								</Button>
								<Button
									variant='contained'
									color='primary'
									onClick={handleNext}
								>
									{activeStep === steps.length - 2 ? 'Siguiente' : 'Siguiente'}
								</Button>
							</div>
						</div>
					)}
				</Grid>
				<Grid item xs={12}>
					<Container maxWidth='xl'>{getStepComponet(activeStep)}</Container>
				</Grid>
			</Grid>
		</div>
	);
}
