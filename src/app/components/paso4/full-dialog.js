import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';

import HorarioVisor from './horario-visor';
const useStyles = makeStyles((theme) => ({
	appBar: {
		position: 'relative',
	},
	title: {
		marginLeft: theme.spacing(2),
		flex: 1,
	},
}));

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction='up' ref={ref} {...props} />;
});

export default function FullScreenDialog(props) {
	const classes = useStyles();
	const [open, setOpen] = React.useState(false);

	const [horario, setHorario] = React.useState();

	React.useEffect(() => {
		setHorario(props.horario);
	}, [props.horario]);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return horario ? (
		<div>
			<Button variant='contained' color='secondary' onClick={handleClickOpen}>
				VISUALIZAR
			</Button>{' '}
			{open ? (
				<Dialog
					fullScreen
					open={open}
					onClose={handleClose}
					TransitionComponent={Transition}
				>
					<AppBar className={classes.appBar}>
						<Toolbar variant='dense'>
							<IconButton
								edge='start'
								color='inherit'
								onClick={handleClose}
								aria-label='close'
							>
								<CloseIcon />
							</IconButton>
							<Typography variant='h6' className={classes.title}>
								Horario
							</Typography>
						</Toolbar>
					</AppBar>
					{horario ? (
						<HorarioVisor
							id='root-visor'
							numHorario={props.numHorario}
							horario={horario}
						/>
					) : (
						<></>
					)}
				</Dialog>
			) : (
				<></>
			)}
		</div>
	) : (
		<></>
	);
}
