import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { setCarrera } from '../../../../redux/actions/carrera';
import { getCarreras } from '../../../../redux/actions/carreras';
import { setMateriasMalla } from '../../../../redux/actions/materias';

import { carrerasResults as carrerasResultSelector } from '../../../../redux/selectors';

import Page from './page';

export default function SearchCarrera(props) {
	const dispatch = useDispatch();
	const carrerasResults = useSelector((state) => carrerasResultSelector(state));

	useEffect(() => {
		if (!carrerasResults) {
			dispatch(getCarreras());
		}
	});

	const onChangeComplete = (event, value, reason) => {
		if (value != null) {
			dispatch(setCarrera(value));
			dispatch(
				setMateriasMalla(
					value['materias'].map((mat) => {
						return { ...mat, check: false };
					})
				)
			);
		}
	};

	const state = { carrerasResults };
	const func = { onChangeComplete };

	return <Page func={func} state={state} />;
}
