import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction='up' ref={ref} {...props} />;
});

export default function AlertDialogSlide(props) {
	const [open, setOpen] = React.useState(props.open);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<div >
			{props.children(handleClickOpen)}
			<Dialog
				open={open}
				TransitionComponent={Transition}
				keepMounted
				onClose={handleClose}
				aria-labelledby='alert-dialog-slide-title'
				aria-describedby='alert-dialog-slide-description'
			>
				<DialogTitle id='alert-dialog-slide-title'>{props.titulo}</DialogTitle>
				<DialogContent dividers>
					{props.contenido}
				</DialogContent>
				<DialogActions>
					{props.actions(handleClose)}
				</DialogActions>
			</Dialog>
		</div>
	);
}
