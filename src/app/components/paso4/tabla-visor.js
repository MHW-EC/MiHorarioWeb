import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Pagination } from '@material-ui/lab';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@material-ui/core/styles';
import Tabla from './tabla';

import { useState } from 'react';
import { paqueteria as paqSelector } from '../../../redux/selectors';
import { seleccionados as selSelector } from '../../../redux/selectors';

import { useSelector, useDispatch } from 'react-redux';
import { resultadosGenerados as resultadosSelector } from '../../../redux/selectors';
import { getResultadosGenerados } from './../../../redux/actions/generador';

import ButtonDialog from './full-dialog';

const useStyles = makeStyles((theme) => ({
	root: {
		'& > * + *': {
			marginTop: theme.spacing(2),
			alignItems: 'center',
			justifyContent: 'center',
			flexDirection: 'column',
			display: 'flex',
		},
	},
}));

export default function PaginationControlled(props) {
	const classes = useStyles();

	const theme = useTheme();
	const [page, setPage] = React.useState(1);
	//const [elementos] = React.useState(pros.elementos);
	const dispatch = useDispatch();

	const paquetesSeleccionados = useSelector((state) => paqSelector(state));
	const idsSeleccionados = useSelector((state) => selSelector(state));
	const [paquetes, setPaquetes] = useState();

	useEffect(() => {
		setPaquetes(
			paquetesSeleccionados
				.filter((paq) => idsSeleccionados.includes(paq['teoricoId']))
				.map((fil) => fil['array'])
		);
	}, [paquetesSeleccionados, idsSeleccionados]);

	const horariosGenerados = useSelector((state) => resultadosSelector(state));
	useEffect(() => {
		if (horariosGenerados.length === 0 && paquetes && paquetes.length > 0) {
			dispatch(getResultadosGenerados(paquetes));
		} else {
			horariosGenerados.sort(function (a, b) {
				return b.length - a.length;
			});
		}
	}, [horariosGenerados, dispatch, paquetes]);

	const handleChange = (event, value) => {
		setPage(value);
	};

	return horariosGenerados ? (
		<div className={classes.root}>
			<SwipeableViews
				disabled
				axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
				index={page - 1}
			> 
			{horariosGenerados.map((horario, index) => (
					<React.Fragment key={index}>
						<Tabla numHorario={index + 1} horario={horario} />
						<br />
						<ButtonDialog numHorario={index + 1} horario={horario} />
					</React.Fragment>
			))}
			</SwipeableViews>

			<Pagination
				//style={classes.pagination}
				count={horariosGenerados.length}
				color={'primary'}
				onChange={handleChange}
			/>
		</div>
	) : (
		<p>Cargando resultados...</p>
	);
}
