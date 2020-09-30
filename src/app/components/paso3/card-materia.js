import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridListTile from '@material-ui/core/GridListTile';
import Card from '@material-ui/core/Card';
import {
	Typography,
	CardContent,
	CardActions,
	Button,
} from '@material-ui/core';
import CardTeorico from './card-teorico';
import { useSelector, useDispatch } from 'react-redux';
import { teoricosResults as paralelosSelector } from '../../../redux/selectors';
import { getTeoricos } from '../../../redux/actions/teorico';
import Skeleton from '@material-ui/lab/Skeleton';
import {
	enqueueSnackbar as enqueueSnackbarAction,
	closeSnackbar as closeSnackbarAction,
} from '../../../redux/actions/notifier';
import CustomGridTitle from './customGridTitle';
const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'space-around',
		overflow: 'hidden',
		backgroundColor: 'transparent',
	},
	rootCard: {
		maxWidth: 400,
		alignContent: 'center',
		alignItems: 'center',
		alignSelf: 'center'
	},
	cardActions: {
		backgroundColor: theme.palette.primary.main,
	},
	cardContent: {
		padding: 10,
	},
	palette: {
		primary: {
			light: '#757ce8',
			main: '#3f50b5',
			dark: '#002884',
			contrastText: '#fff',
		},
		secondary: {
			light: '#ff7961',
			main: '#f44336',
			dark: '#ba000d',
			contrastText: '#000',
		},
		black: '#000000',
		white: '#ffffff',
	},
	nombreMateria: {
		color: '#ffffff',
		width: '-webkit-fill-available',
	},
}));

export default function Component(props) {
	const classes = useStyles();
	const [materia] = useState(props.materia);
	const dispatch = useDispatch();
	const parTeorico = useSelector((state) =>
		paralelosSelector(state, materia['codigo'])
	);

	useEffect(() => {
		if (!parTeorico) {
			dispatch(getTeoricos(materia['codigo']));
		}
	});
	useEffect(() => {
		const enqueueSnackbar = (...args) =>
			dispatch(enqueueSnackbarAction(...args));
		const closeSnackbar = (...args) => dispatch(closeSnackbarAction(...args));
		enqueueSnackbar({
			message: 'Seleccione los paralelos asociados por cada paralelo teórico',
			options: {
				persist: true,
				preventDuplicate: true,
				key: 'alter-par-asociados',
				variant: 'warning',
				action: (key) => <Button onClick={() => closeSnackbar(key)}>OK</Button>,
				style: { whiteSpace: 'pre-line', textAlign: 'left' },
			},
		});
	}, [dispatch]);

	return parTeorico ? (
		<Card elevation={6} >
			<CardContent
				className={classes.cardContent}
			>
				{parTeorico['paralelos'].length === 0 ?
					<Typography align='center'>{"no hay registros :("}</Typography> :
					<CustomGridTitle children={
						parTeorico['paralelos'].map((par) => (
							<GridListTile
								id='lista-par-teoricos'
								key={par['paralelo']}
							>
								<CardTeorico paralelo={par} />
							</GridListTile>
						))
					} />
				}
			</CardContent>
			<CardActions
				className={classes.cardActions}
			>
				<Typography variant='body1' className={classes.nombreMateria}>
					{materia['nombre']} - {materia['codigo']}
				</Typography>
			</CardActions>
		</Card>
	) : (
			<Card elevation={6}>
				<CardContent style={{ padding: 0 }}>
					<Skeleton animation="wave" variant="rect" height={250} />
				</CardContent>
				<CardActions >
					<div style={{ width: "50%", marginLeft: "auto", marginRight: "auto" }}>
						<Skeleton animation="wave" variant="text" height={15} />
					</div>
				</CardActions>
			</Card>
		);
}