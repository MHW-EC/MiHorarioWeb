import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import Typography from '@material-ui/core/Typography';
const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction='up' ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
	divInfo: {
		marginLeft: 'auto',
		marginRight: 0,
	},
	dialogContent: {
		marginLeft: 0,
		marginRight: 'auto',
		textAlign: 'left',
	},
}));

export default function AlertDialogSlide() {
	const [open, setOpen] = React.useState(false);
	const classes = useStyles();

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<div className={classes.divInfo}>
			<IconButton
				color='inherit'
				size='medium'
				//edge='end'
				onClick={handleClickOpen}
			>
				<InfoOutlinedIcon />
			</IconButton>
			<Dialog
				open={open}
				TransitionComponent={Transition}
				keepMounted
				onClose={handleClose}
				aria-labelledby='alert-dialog-slide-title'
				aria-describedby='alert-dialog-slide-description'
			>
				<DialogTitle id='alert-dialog-slide-title'>{'Información'}</DialogTitle>
				<DialogContent dividers>
					<div className={classes.dialogContent}>
						<Typography variant='body1'>
							Si te gustó nuestro trabajo y deseas ayudarnos puedes conectarnos
							a nuestros correos o donar a nuestro Paypal.
						</Typography>
						<br />
						<Typography variant='body1'>
							Josue Cobos Salvador:{' '}
							<a href='mailto:jacobos@fiec.espol.edu.ec' variant='caption'>
								jacobos@fiec.espol.edu.ec
							</a>
						</Typography>
						<br />
						<Typography variant='body1'>
							Enmanuel Magallanes:{' '}
							<a href='mailto:fmagalla@fiec.espol.edu.ec' variant='caption'>
								fmagalla@fiec.espol.edu.ec
							</a>
						</Typography>
						<br />
						<Typography>
							Payapal:{' '}
							<a href='mailto:mihorarioweb@gmail.com' variant='caption'>
								mihorarioweb@gmail.com
							</a>
						</Typography>
					</div>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color='primary'>
						Ok
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
