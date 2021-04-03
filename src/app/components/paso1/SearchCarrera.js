import React, { useEffect } from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Grid, Container, TextField } from '@material-ui/core/';
import { useSelector, useDispatch } from 'react-redux';
import { getCarreras } from '../../../redux/actions/carreras';
import { carrerasResults as carrerasResultSelector } from '../../../redux/selectors';
import { setCarrera } from '../../../redux/actions/carrera';
import { setMateriasMalla } from '../../../redux/actions/materias';
import { cleanCarrera } from '../../../redux/actions/carrera';

export default function SearchCarrera() {
	const dispatch = useDispatch();
	const carrerasResults = useSelector((state) => carrerasResultSelector(state));

	useEffect(() => {
		if (!carrerasResults?.length) {
			dispatch(getCarreras());
		}
	});

	const onChangeComplete = (event, value, reason) => {
		if (value && reason === 'select-option') {
			console.log(value);
			dispatch(setCarrera(value));
			dispatch(
				setMateriasMalla(
					value.materias.map((mat) => {
						return { ...mat, check: false };
					})
				)
			);
		}else if(reason === 'clear'){
			dispatch(cleanCarrera());
		}
	};

	return (
		<Container>
			<Grid container={true} spacing={3} justify='center' alignItems='center'>
				<Grid item xs={12} sm={8} md={8} lg={6} xl={6}>
					{
					carrerasResults && 
						<Autocomplete
						id='input-nombre-carrera'
						onChange={onChangeComplete}
						options={carrerasResults}
						getOptionLabel={(option) => option.nombre}
						renderInput={(params) => (
							<TextField
								{...params}
								id='custom-css-outlined-input'
								label='Escribe el nombre de una carrera'
								variant='outlined'
							/>
						)}
						noOptionsText={'No existe esa carrera :('}
				/>
					}
				</Grid>
			</Grid>
		</Container>
	);
}
