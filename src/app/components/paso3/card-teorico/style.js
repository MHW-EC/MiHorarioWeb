import { makeStyles } from '@material-ui/core';
import { blueGrey } from '@material-ui/core/colors';

export default makeStyles((theme) => ({
	root: {
		//minWidth: 250,
		//maxWidth: 250,
		//maxHeight: 350
	},
	bullet: {
		display: 'inline-block',
		margin: '0 2px',
		transform: 'scale(0.8)',
	},
	div: {
		padding: 0,
		alignContent: 'left',
		alignItems: 'left',
	},
	fab: {
		position: 'absolute',
		right: theme.spacing(0),
		top: theme.spacing(0),
	},
	ghostIcon: {
		opacity: 0,
		padding: 10,
	},
	avatar: {
		backgroundColor: blueGrey[500],
	},
}));
