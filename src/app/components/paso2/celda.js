import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography, Checkbox } from '@material-ui/core';
import { addMateria, removeMateria } from '../../../redux/actions/materias';
import { useDispatch } from 'react-redux';

const useStyles = makeStyles(theme => ({
    contenedor: {
		alignContent: 'center',
		alignItems: 'center'
	},
}));

export default function Celda(props) {
	const [materia] = useState(props.materia);
	const dispatch = useDispatch();
	const classes = useStyles();

	const onCheck = (bool) => {
		bool ? dispatch(addMateria(materia)) : dispatch(removeMateria(materia))
	};

	return (
		<Grid container justify="center"
		alignItems="center">
			<Grid item xs={10}>
				<Grid container>
					<Grid item xs={12}>
						<Typography variant='subtitle2'>{materia['nombre']}</Typography>
						<Typography variant='caption'>{materia['codigo']}</Typography>
					</Grid>
				</Grid>
			</Grid>
			<Grid item xs={2}>
				<Checkbox
					color='primary'
					inputProps={{ 'aria-label': 'secondary checkbox' }}
					onChange={(event) => {
						onCheck(event.target.checked);
					}}
				/>
			</Grid>
		</Grid>
	);
}

Celda.propTypes = {
	materia: PropTypes.object.isRequired,
	materiasSelect: PropTypes.array,
};
