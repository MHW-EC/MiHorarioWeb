import React from 'react';
import { Grid } from '@material-ui/core';
import CardMateria from '../card-materia';

import styles from './style';

export default function page(props) {
	const classes = styles();

	const { state } = props;
	const { matCompile } = state;

	return (
		<div className={classes.root}>
			<Grid container spacing={3} justify='center' alignItems='center'>
				{matCompile.map((materia) => (
					<Grid
						key={materia['codigo']}
						item
						xs={12}
						sm={6}
						md={6}
						lg={3}
						xl={3}
					>
						<CardMateria materia={materia} isMobile={props.isMobile} />
					</Grid>
				))}
			</Grid>
		</div>
	);
}
