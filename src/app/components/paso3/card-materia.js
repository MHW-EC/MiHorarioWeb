import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
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

import {
	enqueueSnackbar as enqueueSnackbarAction,
	closeSnackbar as closeSnackbarAction,
} from '../../../redux/actions/notifier';

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'space-around',
		overflow: 'hidden',
		backgroundColor: 'transparent',
	},

	gridList: {
		flexWrap: 'nowrap',
		transform: 'translateZ(0)',
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

export default function SingleLineGridList(props) {
	const classes = useStyles();
	const [materia] = useState(props.materia);

	//const [paralelos,setParalelos] = useState();
	const dispatch = useDispatch();
	const parTeorico = useSelector((state, codigo) =>
		paralelosSelector(state, materia['codigo'])
	);
	const [isMobile] = useState(props.isMobile);
	const [nCols, setnCols] = useState(); //props.isMobile ? parTeorico.length > 1 ? 1.5 : 1  : parTeorico.length > 1 ? 1.1 : 1);
	//  const [nCols] = useState( );

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

	useEffect(() => {
		if (parTeorico) {
			setnCols(parTeorico['paralelos'].length <= 1 ? 1 : 4.8);

			if (document.getElementById('lista-par-teoricos').addEventListener) {
				// IE9, Chrome, Safari, Opera
				document
					.getElementById('lista-par-teoricos')
					.addEventListener('mousewheel', scrollHorizontally, false);
				// Firefox
				document
					.getElementById('lista-par-teoricos')
					.addEventListener('DOMMouseScroll', scrollHorizontally, false);
			}
		}
	}, [parTeorico, isMobile]);

	const checkFinal = () => {
		let lista = document.getElementById('lista-par-teoricos');
		if (lista.scrollHeight - lista.scrollTop === lista.clientHeight) {
			// IE9, Chrome, Safari, Opera
			document
				.getElementById('lista-par-teoricos')
				.removeEventListener('mousewheel', scrollHorizontally, true);
			// Firefox
			document
				.getElementById('lista-par-teoricos')
				.removeEventListener('DOMMouseScroll', scrollHorizontally, true);
		}
	};

	const scrollHorizontally = (e) => {
		e = window.event || e;
		var delta = Math.max(-1, Math.min(1, e.wheelDelta || -e.detail));
		document.getElementById('lista-par-teoricos').scrollLeft -= delta * 40; // Multiplied by 40
		e.preventDefault();
	};

	return parTeorico ? (
		<Card elevation={6}>
			<CardContent
				className={classes.cardContent}
				style={{ minHeight: isMobile ? 'auto' : 310 }}
			>
				<GridList
					padding={10}
					spacing={10}
					cellHeight={'auto'}
					className={classes.gridList}
					cols={nCols}
				>
					{parTeorico['paralelos'].map((par) => (
						<GridListTile
							id='lista-par-teoricos'
							key={par['paralelo']}
							onMouseOver={scrollHorizontally}
						>
							<CardTeorico paralelo={par} />
						</GridListTile>
					))}
				</GridList>
			</CardContent>
			<CardActions
				className={classes.cardActions}
				style={{ minHeight: isMobile ? 'auto' : 70 }}
			>
				<Typography variant='body1' className={classes.nombreMateria}>
					{materia['nombre']} - {materia['codigo']}
				</Typography>
			</CardActions>
		</Card>
	) : (
		<div>Loading...</div>
	);
}
