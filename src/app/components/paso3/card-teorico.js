import React, { useState, useEffect } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
	Card,
	CardActions,
	CardContent,
	Typography,
	Avatar,
	Tooltip,
	IconButton,
	CardHeader,
	Button,
	Divider,
} from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';
import DialogPractico from './dialog-practico';
import Zoom from '@material-ui/core/Zoom';
import { blueGrey } from '@material-ui/core/colors';
import { formatoIntevalo, formatoIntevaloEx } from '../util/util';
import {
	addSeleccionado,
	removeSeleccionado,
} from '../../../redux/actions/seleccionados';
import { addPaquete, removePaquete } from '../../../redux/actions/paquetes';
import { profesorSelector } from '../../../redux/selectors';
import {getProfesor} from "../../../redux/actions/profesor";
import Skeleton from '@material-ui/lab/Skeleton';
import {GetChip} from "./chips";
//import * as Colors from "@material-ui/core/colors";
const useStyles = makeStyles((theme) => ({
	root: {
		//minWidth: 250,
		//maxWidth: 250,
		//maxHeight: 350
	},
	bullet: {
		display: 'inline-block',
		margin: '0 2px',
		transform: 'scale(0.8)',
	},
	div: {
		padding: 0,
		alignContent: 'left',
		alignItems: 'left',
	},
	fab: {
		position: 'absolute',
		right: theme.spacing(0),
		top: theme.spacing(0),
	},
	ghostIcon: {
		opacity: 0,
		padding: 10,
	},
	avatar: {
		backgroundColor: blueGrey[500],
	},
}));



export default function SimpleCard(props) {
	const classes = useStyles();
	const theme = useTheme();
	const dispatch = useDispatch();
	//const bull = <span className={classes.bullet}>•</span>;
	//necesarios para el cuadro de dialogo de paralelo
	const [open, setOpen] = useState(false);
	const [paralelo] = useState(props.paralelo);
	const [isAdd, setIsAdd] = useState(1);

	const profesor = useSelector((state) =>
		profesorSelector(state, paralelo['profesor'])
	);
	/*useEffect(() => {
		setParalelo(props.paralelo);
	}, [props.paralelo]);
*/
	useEffect(() => {
		if (paralelo && !profesor) {
			dispatch(getProfesor(paralelo['profesor'], paralelo['codigo'], paralelo['nombre']));
		}
	},[paralelo, profesor, dispatch]);

	const handleAddRemove = () => {
		if (isAdd) {
			dispatch(addSeleccionado(paralelo['_id']));
			setIsAdd(0);
		} else {
			dispatch(removeSeleccionado(paralelo['_id']));
			setIsAdd(1);
		}
		if (paralelo['paralelos_practicos'].length === 0) {
			isAdd
				? dispatch(addPaquete([paralelo], paralelo['_id']))
				: dispatch(removePaquete(paralelo['_id']));
		}
	};

	const transitionDuration = {
		enter: theme.transitions.duration.enteringScreen,
		exit: theme.transitions.duration.leavingScreen,
	};

	const fabs = [
		{
			color: 'inherit',
			className: classes.fab,
			icon: <AddBoxOutlinedIcon />,
			label: 'Disabled',
			entra: -1,
			tooltipNode: 'Añadir teórico',
		},
		{
			color: 'primary',
			className: classes.fab,
			icon: <AddBoxOutlinedIcon />,
			label: 'Add',
			entra: 1,
			tooltipNode: 'Añadir teórico',
		},
		{
			color: 'secondary',
			className: classes.fab,
			icon: <DeleteOutlineIcon />,
			label: 'Remove',
			entra: 0,
			tooltipNode: 'Remover teórico',
		},
	];

	const handleParAsociados = () => {
		setOpen(true);
	};
	const handleCloseDialog = () => {
		setOpen(false);
	};
	const getAction = () => {
		return paralelo  ? (
			<>
				<AddBoxOutlinedIcon className={classes.ghostIcon} />
				{fabs.map((fab, index) => (
					<Zoom
						key={fab.color}
						in={isAdd === fab.entra}
						timeout={transitionDuration}
						unmountOnExit
					>
						<Tooltip title={fab.tooltipNode}>
							<IconButton
								aria-label={fab.label}
								className={fab.className}
								color={fab.color}
								onClick={() => {
									handleAddRemove();
								}}
							>
								{fab.icon}
							</IconButton>
						</Tooltip>
					</Zoom>
				))}
			</>
		) : (
			<></>
		);
	};
	return paralelo && profesor ? (
		<Card className={classes.root} variant='outlined'>
			<CardHeader
				avatar={
					<Avatar aria-label='recipe' className={classes.avatar}>
						{paralelo['paralelo']}
					</Avatar>
				}
				action={getAction()}
				title={paralelo['profesor'] ? paralelo['profesor'] : 'Sin nombre'}
				subheader={GetChip(profesor['registros'][0]['promedio'])}
			/>
			<Divider />
			<CardContent className={classes.div}>
				<Typography variant='body2' component='p' aling='left'>
					Clases
				</Typography>
				{paralelo.hasOwnProperty('eventos') ? (
					paralelo.eventos.clases.map((clase) => (
						<React.Fragment key={clase['inicio']}>
							<Typography variant='body2' aling='left' color='textSecondary'>
								- {formatoIntevalo(clase['inicio'], clase['fin'])}
							</Typography>
						</React.Fragment>
					))
				) : (
					<></>
				)}

				{paralelo.hasOwnProperty('eventos') ? (
					<React.Fragment>
						<Typography variant='body2' component='p'>
							Examenes
						</Typography>
						<Typography variant='body2' component='p' color='textSecondary'>
							- Parcial{' '}
							{formatoIntevaloEx(
								paralelo.eventos.examenes.parcial['inicio'],
								paralelo.eventos.examenes.parcial['fin']
							)}
						</Typography>
						<Typography variant='body2' component='p' color='textSecondary'>
							- Final{' '}
							{formatoIntevaloEx(
								paralelo.eventos.examenes.final['inicio'],
								paralelo.eventos.examenes.final['fin']
							)}
						</Typography>
						<Typography variant='body2' component='p' color='textSecondary'>
							- Mejoramiento{' '}
							{formatoIntevaloEx(
								paralelo.eventos.examenes.mejoramiento['inicio'],
								paralelo.eventos.examenes.mejoramiento['fin']
							)}
						</Typography>
					</React.Fragment>
				) : (
					<></>
				)}
			</CardContent>

			{paralelo && paralelo['paralelos_practicos'].length > 0 ? (
				<>
					<Divider />
					<CardActions>
						<Button size='small' onClick={handleParAsociados} color='primary'>
							Par asociados
						</Button>
						<DialogPractico
							id='práctico-menu'
							open={open}
							keepMounted
							onClose={handleCloseDialog}
							teoricoid={paralelo['_id']}
							teorico={paralelo}
						/>
					</CardActions>
				</>
			) : (
				<></>
			)}
		</Card>
	) : (
		<Skeleton variant='rect' amination='wave' width={300} height={300} />
	);
}
