import React from 'react';
import {
	Card,
	CardHeader,
	Avatar,
	Divider,
	CardContent,
	Typography,
	CardActions,
	Button,
} from '@material-ui/core';

import DialogPractico from '../dialog-practico';

import styles from './style';
import Skeleton from '@material-ui/lab/Skeleton';

export default function page(props) {
	const classes = styles();
	const { state, func } = props;

	const { paralelo, open } = state;
	const {
		getAction,
		formatoIntevalo,
		formatoIntevaloEx,
		handleParAsociados,
		handleCloseDialog,
	} = func;

	return paralelo ? (
		<Card className={classes.root} variant='outlined'>
			<CardHeader
				avatar={
					<Avatar aria-label='recipe' className={classes.avatar}>
						{paralelo['paralelo']}
					</Avatar>
				}
				action={getAction()}
				title={paralelo['profesor'] ? paralelo['profesor'] : 'Sin nombre'}
				subheader='Sin calificación'
			/>
			<Divider />
			<CardContent className={classes.div}>
				<Typography variant='body2' component='p' aling='left'>
					Clases
				</Typography>
				{paralelo.hasOwnProperty('eventos') ? (
					paralelo.eventos.clases.map((clase) => (
						<React.Fragment key={clase['inicio']}>
							<Typography variant='body2' aling='left' color='textSecondary'>
								- {formatoIntevalo(clase['inicio'], clase['fin'])}
							</Typography>
						</React.Fragment>
					))
				) : (
					<></>
				)}

				{paralelo.hasOwnProperty('eventos') ? (
					<React.Fragment>
						<Typography variant='body2' component='p'>
							Examenes
						</Typography>
						<Typography variant='body2' component='p' color='textSecondary'>
							- Parcial{' '}
							{formatoIntevaloEx(
								paralelo.eventos.examenes.parcial['inicio'],
								paralelo.eventos.examenes.parcial['fin']
							)}
						</Typography>
						<Typography variant='body2' component='p' color='textSecondary'>
							- Final{' '}
							{formatoIntevaloEx(
								paralelo.eventos.examenes.final['inicio'],
								paralelo.eventos.examenes.final['fin']
							)}
						</Typography>
						<Typography variant='body2' component='p' color='textSecondary'>
							- Mejoramiento{' '}
							{formatoIntevaloEx(
								paralelo.eventos.examenes.mejoramiento['inicio'],
								paralelo.eventos.examenes.mejoramiento['fin']
							)}
						</Typography>
					</React.Fragment>
				) : (
					<></>
				)}
			</CardContent>

			{paralelo && paralelo['paralelos_practicos'].length > 0 ? (
				<>
					<Divider />
					<CardActions>
						<Button size='small' onClick={handleParAsociados} color='primary'>
							Par asociados
						</Button>
						<DialogPractico
							id='práctico-menu'
							open={open}
							keepMounted
							onClose={handleCloseDialog}
							teoricoid={paralelo['_id']}
							teorico={paralelo}
						/>
					</CardActions>
				</>
			) : (
				<></>
			)}
		</Card>
	) : (
		<Skeleton variant='rect' amination='wave' width={300} height={300} />
	);
}
