import React from 'react';

import style from './style';
import { Grid, Container, TextField, Typography } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';

export default function page(props) {
	const classes = style();
	const { state, func } = props;

	return (
		<div className={classes.root}>
			<div>
				<Grid container={true} spacing={3} justify='center' alignItems='center'>
					<Grid item xs={12} sm={8} md={8} lg={5} xl={5}>
						{state.allTeoricosBase && state.allTeoricosUnicos ? (
							<Container>
								<Autocomplete
									id='input-nombre-carrera'
									clearOnEscape={true}
									onChange={func.onChangeComplete}
									options={state.allTeoricosUnicos}
									label='Agregue una nueva materia'
									//options={carrerasResults.reduce((a, b) => {
									//	return {'materias': a.materias.concat(b.materias)} } )['materias']}
									getOptionLabel={(option) => {
										return `${option['nombre']} - ${option['codigo']}`;
									}}
									renderInput={(params) => (
										<TextField
											{...params}
											id='custom-css-outlined-input'
											label='Agregue una nueva materia'
											variant='outlined'
										/>
									)}
								/>
							</Container>
						) : (
							<></>
						)}
					</Grid>
				</Grid>
			</div>
			{state.materiasSelect && state.materiasSelect.length > 0 ? (
				<>
					<Grid
						container
						direction='row'
						justify='flex-start'
						alignItems='flex-start'
					>
						<Grid className={classes.spacingTitle}>
							<Typography variant='subtitle2' color='textSecondary'>
								Seleccionadas
							</Typography>
						</Grid>
					</Grid>

					<Grid
						className={classes.spacing}
						container={true}
						spacing={3}
						justify='center'
						alignItems='center'
					>
						{state.materiasSelect.map((mat) =>
							func.generarCelda(mat, state.materiasSelect.length, false)
						)}
					</Grid>
				</>
			) : (
				<></>
			)}

			{state.materiasMalla && state.materiasMalla.length > 0 ? (
				<>
					<Grid
						container
						direction='row'
						justify='flex-start'
						alignItems='flex-start'
					>
						<Grid className={classes.spacingTitle}>
							<Typography variant='subtitle2' color='textSecondary'>
								Recomendadas
							</Typography>
						</Grid>
					</Grid>

					<Grid
						className={classes.spacing}
						container={true}
						spacing={3}
						justify='center'
						alignItems='center'
					>
						{state.materiasMalla.map((mat) =>
							func.generarCelda(mat, state.materiasMalla.length, true)
						)}
					</Grid>
				</>
			) : (
				<></>
			)}
		</div>
	);
}
