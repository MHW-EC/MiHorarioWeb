import React, { useEffect, useState } from 'react';
import { Paper, Grid, Typography, Button } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';

import {
	materiasMalla as mallaSelSelector,
	carreraSeleccionada as carreraSelector,
	materiasSeleccionadas as matSelSelector,
	allTeoricosResults as allteoricosSelector,
} from '../../../../redux/selectors';

import { getCarrera } from '../../../../redux/actions/carrera';
import { addMateria } from '../../../../redux/actions/materias';
import { getAllTeoricos } from '../../../../redux/actions/teorico';

import {
	getMateriasMalla,
	getMaterias,
} from '../../../../redux/actions/materias';

import {
	enqueueSnackbar as enqueueSnackbarAction,
	closeSnackbar as closeSnackbarAction,
} from '../../../../redux/actions/notifier';

import Celda from './../celda';
import Page from './page';

const generarCelda = (elemento, index, malla) => {
	return (
		<Grid key={elemento.codigo} item xs={6} sm={4} md={4} lg={3} xl={2}>
			<Paper variant='outlined' style={{ minHeight: 125 }} evelation={3}>
				<Celda fromMalla={malla} materia={elemento} />
			</Paper>
		</Grid>
	);
};

export default function Malla(props) {
	const dispatch = useDispatch();

	const carrera = useSelector((state) => carreraSelector(state));

	const allTeoricosBase = useSelector((state) => allteoricosSelector(state));
	const [allTeoricosUnicos, setAllTeoricosUnicos] = useState([]);

	const materiasSelect = useSelector((state) => matSelSelector(state));
	const materiasMalla = useSelector((state) => mallaSelSelector(state));

	const enqueueSnackbar = (...args) => dispatch(enqueueSnackbarAction(...args));
	const closeSnackbar = (...args) => dispatch(closeSnackbarAction(...args));
	const btnCerrar = <Typography style={{ color: '#ffffff' }}>| Ok</Typography>;

	const [refresh, setRefresh] = useState(false);

	useEffect(() => {}, [refresh]);

	useEffect(() => {
		if (!materiasSelect) {
			dispatch(getMaterias());
		}
	});
	useEffect(() => {
		if (!materiasMalla) {
			dispatch(getMateriasMalla());
		}
	});

	useEffect(() => {
		if (allTeoricosBase.length === 0) {
			dispatch(getAllTeoricos());
		}
	});

	useEffect(() => {
		if (allTeoricosBase.length !== 0 && allTeoricosUnicos.length === 0) {
			let unicos = [];
			allTeoricosBase.forEach((ter) => {
				if (
					typeof unicos.find((e) => e.codigo === ter.codigo) === 'undefined'
				) {
					unicos.push(ter);
				}
			});
			setAllTeoricosUnicos(unicos);
		}
	}, [allTeoricosUnicos, allTeoricosBase]);

	useEffect(() => {
		if (!carrera) {
			dispatch(getCarrera());
		}
	});

	const onChangeComplete = (event, value, reason) => {
		if (reason === 'select-option') {
			document.getElementById('input-nombre-carrera').inputValue = '';
			let notInMalla =
				typeof materiasMalla.find((e) => e.codigo === value.codigo) ===
				'undefined';
			if (
				typeof materiasSelect.find((e) => e.key === value.codigo) ===
					'undefined' &&
				notInMalla
			) {
				dispatch(addMateria({ ...value, check: true }));
			}
			if (!notInMalla) {
				materiasMalla.find((e) => {
					let valor = e.codigo === value.codigo;
					if (valor) {
						e.check = true;
					}
					return valor;
				});

				setRefresh(!refresh);
				enqueueSnackbar({
					message: 'Materia añadida satisfactoriamente',
					options: {
						preventDuplicate: true,
						key: new Date().getTime() + Math.random(),
						variant: 'success',
						action: (key) => (
							<Button onClick={() => closeSnackbar(key)}>{btnCerrar} </Button>
						),
					},
				});
			}
		}
	};

	const state = {
		allTeoricosBase,
		allTeoricosUnicos,
		materiasSelect,
		materiasMalla,
	};

	const func = { onChangeComplete, setAllTeoricosUnicos, generarCelda };

	return <Page state={state} func={func} />;
}
