import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography, Checkbox, IconButton } from '@material-ui/core';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import {
	checkMateria,
	unCheckMateria,
	removeMateria,
} from '../../../redux/actions/materias';
import { useDispatch } from 'react-redux';
import CardActionArea from '@material-ui/core/CardActionArea'
export default function Celda(props) {
	const [materia] = useState(props.materia);
	const [marcado, setMarcado] = useState(props.materia.check);
	
	const dispatch = useDispatch();

	const fromMalla = props.fromMalla;


const onCheck = (event) => {
	console.log("manejador check")
	!marcado ? dispatch(checkMateria(materia)) : dispatch(unCheckMateria(materia));
	setMarcado(!marcado);
};
	
	const handleBorrar = () => {
		dispatch(removeMateria(materia));
	};

	return (
		<CardActionArea onClick={onCheck}>
		<Grid
			container={true}
			justify='center'
			alignItems='center'
			style={{ minHeight: 125 }}
		>
			<Grid container item xs={9}>
				<Grid item xs={12}>
						<Typography variant='subtitle2'>{materia['nombre']}</Typography>
						<Typography variant='caption'>{materia['codigo']}</Typography>
				</Grid>
			</Grid>
			<Grid item xs={2} container
					direction='column'
					justify='center'
					alignItems='center'
					spacing={0}>
					<Grid item xs={12}>
						<Checkbox
							checked={marcado}
							color='primary'
							inputProps={{ 'aria-label': 'secondary checkbox' }}
						/>
					</Grid>
					<Grid item xs={12}>
						{fromMalla ? (
							null
						) : (
							<IconButton onClick={handleBorrar}>
								<CloseOutlinedIcon />
							</IconButton>
						)}
					</Grid>
				</Grid>
		</Grid>
		</CardActionArea>
	);
}

Celda.propTypes = {
	materia: PropTypes.object.isRequired,
	materiasSelect: PropTypes.array,
};
