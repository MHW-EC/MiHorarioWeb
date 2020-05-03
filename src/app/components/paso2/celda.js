import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, Checkbox } from '@material-ui/core';
import { addMateria,checkMateria,unCheckMateria, removeMateria } from '../../../redux/actions/materias';
import { useDispatch } from 'react-redux';

const useStyles = makeStyles((theme) => ({
	contenedor: {
		alignContent: 'center',
		alignItems: 'center',
	},
}));

export default function Celda(props) {
	const [materia] = useState(props.materia);
	//const [displayed, setIsDisplayed] = useState(false);
	const [marcado, setMarcado] = useState(props.materia.check);
	const dispatch = useDispatch();
	const classes = useStyles();

	/*useEffect(() => {
		if (!displayed && props.fromAutocomplete) {
			dispatch(addMateria(materia))
			dispatch(checkMateria(materia));
		}
	}, [displayed, props.fromAutocomplete, dispatch, materia]);
*/
	const onCheck = (bool) => {
		setMarcado(!marcado);
		bool ? dispatch(checkMateria(materia)) : dispatch(unCheckMateria(materia));
	};
	const handleBorrar = () => {
		console.log("click cerrar");
		dispatch(removeMateria(materia))
	}

	return (
		<Grid
			container={true}
			justify='center'
			alignItems='center'
			style={{ minHeight: 125 }}
		>
			<Grid item xs={9}>
				<Grid container>
					<Grid item xs={12}>
						<Typography variant='caption' onClick={handleBorrar}>x</Typography>
					</Grid>
					<Grid item xs={12}>
						<Typography variant='subtitle2'>{materia['nombre']}</Typography>
						<Typography variant='caption'>{materia['codigo']}</Typography>
					</Grid>
				</Grid>
			</Grid>
			<Grid item xs={2}>
				<Checkbox
					checked={marcado}
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
