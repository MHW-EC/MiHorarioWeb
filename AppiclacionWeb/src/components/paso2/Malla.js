import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Grid, Typography, Checkbox } from '@material-ui/core';

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

	const [refresh] = useState(false);
	const [checked, setChecked] = useState(true);

	const classes = useStyles();
	const [columnas] = useState(5);

	const [codigos, setCodigos] = useState([]);

	const consultarMaterias = async () => {
		
		let response = await fetch(`/malla/${props.carrera}`);

		if (response.ok) {
			setCodigos(await response.json());
		}
	};

	useEffect(() => {
		consultarMaterias();
	}, [refresh])

	const handleChange = (event) => {
		setChecked(event.target.checked);
		//props.varMaterias.push()
	};

	const listItems = [];

	let fila = [];
	
	codigos.forEach((element, index) => {
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
					<Grid container>
						<Grid item xs={6}>
							<Grid container>
								<Grid item xs={12}>
									<Typography variant='subtitle2'>MATERIA {index}</Typography>
								</Grid>
								<Grid item xs={12}>
									<Typography variant='caption'>{element}</Typography>
								</Grid>
							</Grid>
						</Grid>
						<Grid item xs={6}>
							<Checkbox
								color='primary'
								inputProps={{ 'aria-label': 'secondary checkbox' }}
								handleChange={() => {
									handleChange();
								}}
							/>
						</Grid>
					</Grid>
				</Paper>
			</Grid>
		);
	});

	return <div className={classes.root}>{listItems}</div>;
}
