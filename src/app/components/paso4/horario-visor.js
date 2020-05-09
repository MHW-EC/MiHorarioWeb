import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Horario from './horario';
import * as Colors from '@material-ui/core/colors/';
import { eventoToAppointment } from '../util/util';
import { IconButton, Button } from '@material-ui/core';
import html2canvas from 'html2canvas';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import {
	enqueueSnackbar as enqueueSnackbarAction,
	closeSnackbar as closeSnackbarAction,
} from '../../../redux/actions/notifier';
import { useDispatch } from 'react-redux';
import FileSaver from 'file-saver';

//import  {appointmentsC}  from './demo-data/appointments';
//import  {appointmentsP}  from './demo-data/appointmentsP';
//import  {appointmentsF}  from './demo-data/appointmentsF';
//import  {appointmentsM}  from './demo-data/appointmentsM';

function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<Typography
			component='div'
			role='tabpanel'
			hidden={value !== index}
			id={`nav-tabpanel-${index}`}
			aria-labelledby={`nav-tab-${index}`}
			{...other}
		>
			{value === index && <Box p={3}>{children}</Box>}
		</Typography>
	);
}

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.any.isRequired,
	value: PropTypes.any.isRequired,
};

function a11yProps(index) {
	return {
		id: `nav-tab-${index}`,
		'aria-controls': `nav-tabpanel-${index}`,
	};
}

function LinkTab(props) {
	return (
		<Tab
			component='a'
			onClick={(event) => {
				event.preventDefault();
			}}
			{...props}
		/>
	);
}

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		backgroundColor: theme.palette.background.paper,
	},
	ico: {
		bottom: '5%',
		right: '60px',
		float: 'right',
		transform: 'scale(1.8)',
		position: 'fixed',
	},
}));

export default function NavTabs(props) {
	const classes = useStyles();
	const theme = useTheme();
	const [value, setValue] = React.useState(0);
	const [instancias, setInstancias] = React.useState();
	const [appos, setApos] = React.useState();
	const [horario, setHorario] = React.useState();
	const [panel, setPanel] = React.useState(0);

	const dispatch = useDispatch();
	const enqueueSnackbar = (...args) => dispatch(enqueueSnackbarAction(...args));
	const closeSnackbar = (...args) => dispatch(closeSnackbarAction(...args));

	React.useEffect(() => {
		setHorario(props.horario);
	}, [props.horario]);

	React.useEffect(() => {
		if (horario) {
			setInstancias(obtenerInstancias(horario));
		}
	}, [horario]);

	React.useEffect(() => {
		if (horario) {
			setApos(obtenerAppointments(horario));
		}
	}, [horario]);

	React.useEffect(() => {
		const enqueueSnackbar = (...args) =>
			dispatch(enqueueSnackbarAction(...args));
		const closeSnackbar = (...args) => dispatch(closeSnackbarAction(...args));
		enqueueSnackbar({
			message:
				'Para realizar la captura de pantalla, desliza al inicio del horario',
			options: {
				persist: true,
				preventDuplicate: true,
				key: 'alter-horario',
				variant: 'warning',
				action: (key) => <Button onClick={() => closeSnackbar(key)}>OK</Button>,
				style: { whiteSpace: 'pre-line', textAlign: 'left' },
			},
		});
	}, [dispatch]);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	const handleChangeIndex = (index) => {
		setValue(index);
	};

	const obtenerInstancias = (horario) => {
		let codigosUnicos = new Set();
		horario.forEach((elemento) => {
			codigosUnicos.add(elemento['codigo']);
		});

		let colores = Object.values(Colors).slice(1); //cojo colores de la lib Colors de material ui
		let instancias = []; //asi le llama la documentacion a un prop de appointment

		let index = 0;
		for (let codigo of codigosUnicos) {
			instancias.push({ id: codigo, color: colores[index++] }); //agrego un color por cada codigo
		}
		return instancias;
	};

	const obtenerAppointments = (horario) => {
		let appointmentsC = [];
		let appointmentsP = [];
		let appointmentsF = [];
		let appointmentsM = [];

		horario.forEach((materia) => {
			materia['eventos']['clases'].forEach((clase) => {
				appointmentsC.push(
					eventoToAppointment(materia, clase, appointmentsC.length, true)
				);
			});

			if (
				'examenes' in materia['eventos'] &&
				Object.keys(materia['eventos']['examenes'].length === 3)
			) {
				//deben haber 3 examenes
				let objParcial = materia['eventos']['examenes']['parcial'];
				appointmentsP.push(
					eventoToAppointment(materia, objParcial, appointmentsP.length, false)
				);
				let objFinal = materia['eventos']['examenes']['final'];
				appointmentsF.push(
					eventoToAppointment(materia, objFinal, appointmentsF.length, false)
				);
				let objMejoramiento = materia['eventos']['examenes']['mejoramiento'];
				appointmentsM.push(
					eventoToAppointment(
						materia,
						objMejoramiento,
						appointmentsM.length,
						false
					)
				);
			}
		});

		return [appointmentsC, appointmentsP, appointmentsF, appointmentsM];
	};

	const getId_Nombre = () => {
		switch (panel) {
			case 0:
				return {
					id: '#nav-tabpanel-0',
					nombre: `horario-${props.numHorario}-clases`,
				};
			case 1:
				return {
					id: '#nav-tabpanel-1',
					nombre: `horario-${props.numHorario}-parcial`,
				};
			case 2:
				return {
					id: '#nav-tabpanel-2',
					nombre: `horario-${props.numHorario}-final`,
				};
			case 3:
				return {
					id: '#nav-tabpanel-3',
					nombre: `horario-${props.numHorario}-mejoramiento`,
				};
			default:
				return '';
		}
	};

	const takeScreenshot = () => {
		let { id, nombre } = getId_Nombre();
		html2canvas(document.querySelector(id)).then(function (canvas) {
			canvas.toBlob(function (blob) {
				// Generate file download
				FileSaver.saveAs(blob, nombre + '.png');
			});
		});
		enqueueSnackbar({
			message: 'Se ha tomado la captura satisfactiramente',
			options: {
				preventDuplicate: true,
				key: new Date().getTime() + Math.random(),
				variant: 'success',
				action: (key) => <Button onClick={() => closeSnackbar(key)}>OK</Button>,
				style: { whiteSpace: 'pre-line', textAlign: 'left' },
			},
		});
	};

	return horario && instancias && appos ? (
		<div className={classes.root} id='root-views'>
			<AppBar position='static' color='inherit'>
				<Tabs
					variant='fullWidth'
					value={value}
					onChange={handleChange}
					aria-label='nav tabs example'
				>
					<LinkTab
						label='CLASES'
						{...a11yProps(0)}
						onClick={() => {
							setPanel(0);
						}}
					/>
					<LinkTab
						label='PARCIAL'
						{...a11yProps(1)}
						onClick={() => {
							setPanel(1);
						}}
					/>
					<LinkTab
						label='FINAL'
						{...a11yProps(2)}
						onClick={() => {
							setPanel(2);
						}}
					/>
					<LinkTab
						label='MEJORAMIENTO'
						{...a11yProps(3)}
						onClick={() => {
							setPanel(3);
						}}
					/>
				</Tabs>
			</AppBar>

			<SwipeableViews
				axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
				index={value}
				onChangeIndex={handleChangeIndex}
			>
				<TabPanel value={value} index={0}>
					<Horario appointments={appos[0]} instancias={instancias} />
				</TabPanel>

				<TabPanel value={value} index={1}>
					<Horario appointments={appos[1]} instancias={instancias} />
				</TabPanel>

				<TabPanel value={value} index={2}>
					<Horario appointments={appos[2]} instancias={instancias} />
				</TabPanel>

				<TabPanel value={value} index={3}>
					<Horario appointments={appos[3]} instancias={instancias} />
				</TabPanel>
			</SwipeableViews>
			<IconButton
				hidden={true}
				onClick={takeScreenshot}
				className={classes.ico}
			>
				<CameraAltIcon />
			</IconButton>
		</div>
	) : (
		<></>
	);
}
