import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CardMateria from './card-materia';
import { useSelector, useDispatch } from 'react-redux';
import { materiasSeleccionadas as matSelSelector } from '../../../redux/selectors';
import { getMateriasMalla, getMaterias } from '../../../redux/actions/materias';
import { materiasMalla as mallaSelSelector } from '../../../redux/selectors';

const useStyles = makeStyles({
	root: {
		padding: '10px',
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'column',
		display: 'flex',
	},
	cardParalelo: {
		width: '80%',
	},
});

export default function DenseTable(props) {
	const classes = useStyles();
	const dispatch = useDispatch();
	const materiasSelect = useSelector((state) => matSelSelector(state));
	const materiasMalla = useSelector((state) => mallaSelSelector(state));
	const [matCompile, setMatCompile] = useState([]);

	useEffect(() => {
		if (!materiasSelect) {
			dispatch(getMaterias());
		} else {
			setMatCompile((anterior) => {
				return [
					...anterior,
					...materiasSelect.filter((mat) => mat.check === true),
				];
			});
		}
	}, [materiasSelect, dispatch]);

	useEffect(() => {
		if (!materiasMalla) {
			dispatch(getMateriasMalla());
		} else {
			setMatCompile((anterior) => {
				return [
					...anterior,
					...materiasMalla.filter((mat) => mat.check === true),
				];
			});
		}
	}, [materiasMalla, dispatch]);

	return (
		<div className={classes.root}>
			<Grid container spacing={3} justify='center' alignItems='center'>
				{matCompile.map((materia) => (
					<Grid
						key={materia['codigo']}
						item
						xs={12}
						sm={6}
						md={4}
						lg={3}
						xl={2}
					>
						<CardMateria materia={materia} isMobile={props.isMobile} />
					</Grid>
				))}
			</Grid>
		</div>
	);
}
