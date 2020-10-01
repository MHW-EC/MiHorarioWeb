import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import CardMateria from './card-materia';
import { useSelector, useDispatch } from 'react-redux';
import { materiasSeleccionadas as matSelSelector } from '../../../redux/selectors';
import { getMateriasMalla, getMaterias } from '../../../redux/actions/materias';
import { materiasMalla as mallaSelSelector } from '../../../redux/selectors';

export default function DenseTable(props) {
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
		<Grid container spacing={3} justify="center" alignItems="flex-start">
				{matCompile.map((materia) => (
					<Grid
						key={materia['codigo']}
						item
						xs={12}
						xl={10}
						sm={9}
						md={7}
						lg={7}
					>
						<CardMateria materia={materia} />
					</Grid>
				))}
		</Grid>
	);
}
