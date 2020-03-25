import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Grid } from '@material-ui/core';
import Celda from './celda';

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
	const [carrera] = useState(props.carrera);
	const [materiasSelect] = useState(props.materiasSelect);
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

	materias.forEach((element, index) => {
		listItems.push(
			<Grid key={index + 'A'} item xs={10} sm={6} md={6} lg={4} xl={4}>
				<Paper className={classes.paper} variant={'outlined'}>
					<Celda materia={element} materiasSelect={materiasSelect} />
				</Paper>
			</Grid>
		);

		//fila.push();
	});

	return (
		<div className={classes.root}>
			<Grid container spacing={3}>
				{listItems}
			</Grid>
		</div>
	);
}
