import React from 'react';
import {
	ExpansionPanel,
	ExpansionPanelSummary,
	FormControlLabel,
	Checkbox,
	ExpansionPanelDetails,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Skeleton from '@material-ui/lab/Skeleton';

import styles from './style';
import CardAsociado from '../card-asociado';

export default function page(props) {
	const classes = styles();

	const { state, func } = props;

	const { parAsociados, teorico } = state;
	const { handleAddPaquete } = func;

	return parAsociados ? (
		<div className={classes.root}>
			{parAsociados['paralelos'].map((par) => (
				<ExpansionPanel key={par['_id']}>
					<ExpansionPanelSummary
						expandIcon={<ExpandMoreIcon />}
						aria-label='Expand'
						id={par['_id']}
					>
						<FormControlLabel
							aria-label='Acknowledge'
							onClick={(event) => event.stopPropagation()}
							onFocus={(event) => event.stopPropagation()}
							control={
								<Checkbox
									color='primary'
									onChange={(event) => handleAddPaquete(event, teorico, par)}
								/>
							}
							label={`Paralelo ${par['paralelo']}`}
						/>
					</ExpansionPanelSummary>
					<ExpansionPanelDetails style={{ padding: 0 }}>
						<CardAsociado paralelo={par} />
					</ExpansionPanelDetails>
				</ExpansionPanel>
			))}
		</div>
	) : (
		<>
			{['1', '2'].map((e) => (
				<div key={e} className={classes.skeleton}>
					<Skeleton
						variant='text'
						width={100}
						className={classes.subSkeleton}
					/>
				</div>
			))}
		</>
	);
}
