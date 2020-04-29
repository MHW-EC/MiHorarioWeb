import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Grid } from '@material-ui/core';
import Celda from './celda';
import { useSelector, useDispatch } from 'react-redux';
import { carreraSeleccionada as carreraSelector } from '../../../redux/selectors';
import { getCarrera } from '../../../redux/actions/carrera';
//carreraSeleccionada
const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	paper: {
		padding: theme.spacing(1),
		//alignContent: 'center', 
		color: theme.palette.text.secondary,
	},
	paperOnClick: {
		borderColor: 'blue',
	},
}));

export default function Malla(props) {
	const classes = useStyles();
	const dispatch = useDispatch();
	const carrera = useSelector((state) => carreraSelector(state));

	useEffect(() => {
		if (!carrera) {
			dispatch(getCarrera());
		}
	});

	const listItems = [];
	carrera['materias'].forEach((element, index) => {
		listItems.push(
			<Grid key={index} item xs={6} sm={4} md={4} lg={3} xl={3} justify="center"
			alignItems="center">
				<Paper className={classes.paper} variant='outlined' style={{minHeight: 125}} evelation={3}>
					<Celda materia={element} materiasSelect={[]} />
				</Paper>
			</Grid>
		);
	});
	return (
		<div className={classes.root}>
			<Grid container spacing={3}>
				{listItems}
			</Grid>
		</div>
	);
}
