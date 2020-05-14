import React from 'react';
import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
} from '@material-ui/core';

export default function page(props) {
	const { state, func } = props;

	return (
		<div>
			{func.children(func.andleClickOpen)}
			<Dialog
				open={state.open}
				TransitionComponent={func.Transition}
				keepMounted
				onClose={func.handleClose}
				aria-labelledby='alert-dialog-slide-title'
				aria-describedby='alert-dialog-slide-description'
			>
				<DialogTitle id='alert-dialog-slide-title'>{state.titulo}</DialogTitle>
				<DialogContent dividers>{state.contenido}</DialogContent>
				<DialogActions>{func.actions(func.handleClose)}</DialogActions>
			</Dialog>
		</div>
	);
}
