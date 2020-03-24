import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Grid } from '@material-ui/core';
import Celda from "./celda";

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1
	},
	paper: {
		padding: theme.spacing(2),

		color: theme.palette.text.secondary
	},
	paperOnClick: {
		borderColor: 'blue'
	}
}));

export default function Malla(props) {

	//const [refresh] = useState(false);
	//const [checked, setChecked] = useState(true);

	const classes = useStyles();
	const [columnas] = useState(5);

	const [carrera] = useState(props.carrera);
	const [materiasSelect] = useState(props.materiasSelect)
	const [materias] = useState(carrera['materias']);
//materiasSelect
	/*const consultarMaterias = async () => {
		
		let response = await fetch(`/malla/${props.carrera}`);

		if (response.ok) {
			setCodigos(await response.json());
		}
	};*/

	/*useEffect(() => {
		consultarMaterias();
	}, [refresh])
	*/

	const listItems = [];
	let fila = [];
	
	materias.forEach((element, index) => {
		if (index % columnas === 0) {
			fila = [];
		} else if (index % columnas === columnas - 2) {
			listItems.push(
				<Grid key={index} container spacing={3}>
					{fila}
				</Grid>
			);
		}

		fila.push(
			<Grid key={index + 'A'} item xs>
				<Paper className={classes.paper} variant={'outlined'}>
					<Celda materia={element} materiasSelect={materiasSelect} />
				</Paper>
			</Grid>
		);
	});
	

return <div className={classes.root}>{listItems}</div>;
}
