import { makeStyles } from '@material-ui/core';

export default makeStyles({
	root: {
		width: '100%',
		padding: 0,
	},
	skeleton: {
		minHeight: '50px',
		justifyContent: 'center',
		alignItems: 'center',
		display: 'flex',
	},
	subSkeleton: {
		marginLeft: '25%',
		marginRight: 'auto',
	},
	/*contenedorPanelDesplegable: {
    backgroundColor: Colores.cyan[500],
    alignItems: "center",
    padding: 10
  }*/
});
