import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
	root: {
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'space-around',
		overflow: 'hidden',
		backgroundColor: 'transparent',
	},

	gridList: {
		flexWrap: 'nowrap',
		transform: 'translateZ(0)',
	},
	cardActions: {
		backgroundColor: theme.palette.primary.main,
	},
	cardContent: {
		padding: 10,
	},
	palette: {
		primary: {
			light: '#757ce8',
			main: '#3f50b5',
			dark: '#002884',
			contrastText: '#fff',
		},
		secondary: {
			light: '#ff7961',
			main: '#f44336',
			dark: '#ba000d',
			contrastText: '#000',
		},
		black: '#000000',
		white: '#ffffff',
	},
	nombreMateria: {
		color: '#ffffff',
		width: '-webkit-fill-available',
	},
}));
