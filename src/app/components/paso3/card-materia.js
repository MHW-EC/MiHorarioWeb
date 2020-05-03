import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Card from '@material-ui/core/Card';
import { Typography, CardContent, CardActions } from '@material-ui/core';
import CardTeorico from './card-teorico';
import { useSelector, useDispatch } from 'react-redux';
import { teoricosResults as paralelosSelector } from '../../../redux/selectors';
import { getTeoricos } from '../../../redux/actions/teorico';

const useStyles = makeStyles((theme) => ({
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

export default function SingleLineGridList(props) {
	const classes = useStyles();
	const [materia] = useState(props.materia);

	//const [paralelos,setParalelos] = useState();
	const dispatch = useDispatch();
	const parTeorico = useSelector((state, codigo) =>
		paralelosSelector(state, materia['codigo'])
	);
	const [isMobile] = useState(props.isMobile);
	const [nCols, setnCols] = useState(); //props.isMobile ? parTeorico.length > 1 ? 1.5 : 1  : parTeorico.length > 1 ? 1.1 : 1);
	//  const [nCols] = useState( );

	useEffect(() => {
		if (!parTeorico) {
			dispatch(getTeoricos(materia['codigo']));
		}
	});

	useEffect(() => {
		if (parTeorico) {
			setnCols(parTeorico['paralelos'].length <= 1 ? 1.1 : 1.15);
		}
	}, [parTeorico, isMobile]);

	return parTeorico ? (
		<Card elevation={6}>
			<CardContent
				className={classes.cardContent}
				style={{ minHeight: isMobile ? 'auto' : 310 }}
			>
				<GridList
					padding={10}
					spacing={10}
					cellHeight={'auto'}
					className={classes.gridList}
					cols={nCols}
				>
					{parTeorico['paralelos'].map((par) => (
						<GridListTile key={par['paralelo']}>
							<CardTeorico paralelo={par} />
						</GridListTile>
					))}
				</GridList>
			</CardContent>
			<CardActions
				className={classes.cardActions}
				style={{ minHeight: isMobile ? 'auto' : 70 }}
			>
				<Typography variant='body1' className={classes.nombreMateria}>
					{materia['nombre']} - {materia['codigo']}
				</Typography>
			</CardActions>
		</Card>
	) : (
		<div>Loading...</div>
	);
}
/*

         <GridListTile key={par["paralelo"]}>
         <CardParalelo isteorico={true} teorico={par}/>
       </GridListTile>*/
