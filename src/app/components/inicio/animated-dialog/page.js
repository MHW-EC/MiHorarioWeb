import React from 'react';
import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
} from '@material-ui/core';

export default function page({ state, func }) {
	const { open, contenido, titulo } = state;
	const { Transition, handleClose, actions } = func;

	return (
		<div>
			{func.children(func.andleClickOpen)}
			<Dialog
				open={open}
				TransitionComponent={Transition}
				keepMounted
				onClose={handleClose}
				aria-labelledby='alert-dialog-slide-title'
				aria-describedby='alert-dialog-slide-description'
			>
				<DialogTitle id='alert-dialog-slide-title'>{titulo}</DialogTitle>
				<DialogContent dividers>{contenido}</DialogContent>
				<DialogActions>{actions(handleClose)}</DialogActions>
			</Dialog>
		</div>
	);
}
