import React from 'react';

import styles from './style';
import CardTeorico from '../card-teorico';
import {
	Card,
	CardContent,
	GridList,
	GridListTile,
	CardActions,
	Typography,
} from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';

export default function page(props) {
	const classes = styles();

	const { state } = props;
	const { nCols, materia, isMobile, parTeorico } = state;

	return parTeorico ? (
		<Card elevation={6}>
			<CardContent
				className={classes.cardContent}
				style={{ minHeight: isMobile ? 'auto' : 310 }}
			>
				<GridList
					padding={10}
					spacing={10}
					cellHeight={'auto'}
					className={classes.gridList}
					cols={nCols}
				>
					{parTeorico['paralelos'].map((par) => (
						<GridListTile id='lista-par-teoricos' key={par['paralelo']}>
							<CardTeorico paralelo={par} />
						</GridListTile>
					))}
				</GridList>
			</CardContent>
			<CardActions
				className={classes.cardActions}
				style={{ minHeight: isMobile ? 'auto' : 70 }}
			>
				<Typography variant='body1' className={classes.nombreMateria}>
					{materia['nombre']} - {materia['codigo']}
				</Typography>
			</CardActions>
		</Card>
	) : (
		<div className={classes.skeleton}>
			<Skeleton variant='rect' amination='wave' width={400} height={400} />
		</div>
	);
}
