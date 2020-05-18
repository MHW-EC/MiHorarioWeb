import React, { useState, useEffect } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Tooltip, IconButton } from '@material-ui/core';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';
import { useDispatch } from 'react-redux';

import Zoom from '@material-ui/core/Zoom';
import { blueGrey } from '@material-ui/core/colors';
import { formatoIntevalo, formatoIntevaloEx } from '../../util/util';
import {
	addSeleccionado,
	removeSeleccionado,
} from '../../../../redux/actions/seleccionados';
import { addPaquete, removePaquete } from '../../../../redux/actions/paquetes';

import Page from './page';

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
	const [paralelo, setParalelo] = useState();
	const [isAdd, setIsAdd] = useState(1);

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
		return paralelo ? (
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

	useEffect(() => {
		setParalelo(props.paralelo);
	}, [props.paralelo]);

	//se usa cunado un paralelo teorico no tiene practicos

	const state = { paralelo, open };
	const func = {
		getAction,
		formatoIntevalo,
		formatoIntevaloEx,
		handleParAsociados,
		handleCloseDialog,
	};

	return <Page state={state} func={func} />;
}
