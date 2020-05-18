import React from 'react';
import style from './style';
import {
	Card,
	CardHeader,
	Avatar,
	Divider,
	CardContent,
	Typography,
} from '@material-ui/core';

import { formatoIntevalo } from '../../util/util';

export default function page(props) {
	const classes = style();
	const { state } = props;
	const paralelo = state.paralelo;

	return paralelo ? (
		<Card className={classes.root}>
			<CardHeader
				avatar={
					<Avatar aria-label='recipe' className={classes.avatar}>
						{paralelo['paralelo']}
					</Avatar>
				}
				title={paralelo['profesor'] ? paralelo['profesor'] : 'Sin nombre'}
				subheader='Sin calificación'
			/>
			<Divider />
			<CardContent className={classes.div}>
				<br />
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
			</CardContent>
		</Card>
	) : (
		<div>Loading...</div>
	);
}
