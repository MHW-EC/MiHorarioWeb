import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	paper: {
		padding: theme.spacing(1),
		//alignContent: 'center',
		color: theme.palette.text.secondary,
	},
	paperOnClick: {
		borderColor: 'blue',
	},
	spacing: {
		paddingTop: '10px',
	},
	spacingTitle: {
		paddingTop: '30px',
	},
}));
