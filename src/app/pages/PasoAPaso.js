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
import { useDispatch, useSelector } from 'react-redux';
import { cleanCarrera } from '../../redux/actions/carrera';
import { cleanMaterias } from '../../redux/actions/materias';
import { carreraSeleccionada as carreraSelector } from '../../redux/selectors';
import { cleanSel } from '../../redux/actions/seleccionados';
import { cleanPaquetes } from '../../redux/actions/paquetes';
import { cleanAsociados } from '../../redux/actions/asociado';
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
			return 'Una vez cargados los resultados puede ver más información en VIZUALIZAR';
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

	const paquetesSeleccionados = useSelector((state) => paqSelector(state));

	const seleccionados = useSelector((state) => selecSelector(state));

	const btnCerrar = (
		<Typography style={{ color: '#ffffff' }}>| Cerrar</Typography>
	);

	//const [carrera, setCarrera] = React.useState({});
	//const [materiasSelect, setMateriasSelect] = React.useState([]);

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
					console.log('Respuesta redr: ' + link);
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

	const steps = getSteps();

	const handleNext = () => {
		//setNombreCarrera(document.getElementById('input-nombre-carrera').value);
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
								<Button onClick={() => closeSnackbar(key)}>{btnCerrar} </Button>
							),
							style: { whiteSpace: 'pre-line', textAlign: 'left' },
						},
					});
				}
				break;
			case 2:
				if (paquetesSeleccionados.length === 0) {
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

	//Esto nos devuelve el componente del paso segun el paso en el que estamos
	function getStepComponet(stepIndex) {
		switch (stepIndex) {
			case 0:
				return <SearchCarrera />;
			case 1:
				return <Malla />;
			case 2:
				return <OpcionesMaterias isMobile={isMobile} />;
			case 3:
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
