import React from 'react';
import { Grid, Typography, IconButton, Checkbox } from '@material-ui/core';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';

export default function page({ state, func }) {
	const { materia, marcado, fromMalla } = state;
	const { handleBorrar, onCheck } = func;

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
						<Typography variant='subtitle2'>{materia['nombre']}</Typography>
						<Typography variant='caption'>{materia['codigo']}</Typography>
					</Grid>
				</Grid>
			</Grid>
			<Grid item xs={3}>
				<Grid
					container
					direction='column'
					justify='center'
					alignItems='center'
					spacing={0}
				>
					<Grid item xs={12}>
						<Checkbox
							checked={marcado}
							color='primary'
							inputProps={{ 'aria-label': 'secondary checkbox' }}
							onChange={(event) => {
								onCheck(event.target.checked);
							}}
						/>
					</Grid>
					<Grid item xs={12}>
						{fromMalla ? (
							<p></p>
						) : (
							<IconButton onClick={handleBorrar}>
								<CloseOutlinedIcon />
							</IconButton>
						)}
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
}
