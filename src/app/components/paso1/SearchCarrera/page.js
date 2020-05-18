import React from 'react';
import { Container, Grid, TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';

export default function page({ state, func }) {
	const { carrerasResults } = state;
	const { onChangeComplete } = func;

	return (
		<Container>
			<Grid container={true} spacing={3} justify='center' alignItems='center'>
				<Grid item xs={12} sm={8} md={8} lg={6} xl={6}>
					{carrerasResults ? (
						<Autocomplete
							id='input-nombre-carrera'
							onChange={onChangeComplete}
							options={state.carrerasResults.sort(
								(a, b) => -b.nombre.localeCompare(a.nombre)
							)}
							getOptionLabel={(option) => option['nombre']}
							renderInput={(params) => (
								<TextField
									{...params}
									id='custom-css-outlined-input'
									label='Nombre de su carrera'
									variant='outlined'
								/>
							)}
						/>
					) : (
						<></>
					)}
				</Grid>
			</Grid>
		</Container>
	);
}
