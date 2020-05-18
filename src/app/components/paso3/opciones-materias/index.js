import React, { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { materiasSeleccionadas as matSelSelector } from '../../../../redux/selectors';
import {
	getMateriasMalla,
	getMaterias,
} from '../../../../redux/actions/materias';
import { materiasMalla as mallaSelSelector } from '../../../../redux/selectors';

import Page from './page';

export default function DenseTable(props) {
	const dispatch = useDispatch();
	const materiasSelect = useSelector((state) => matSelSelector(state));
	const materiasMalla = useSelector((state) => mallaSelSelector(state));
	const [matCompile, setMatCompile] = useState([]);

	useEffect(() => {
		if (!materiasSelect) {
			dispatch(getMaterias());
		} else {
			setMatCompile((anterior) => {
				return [
					...anterior,
					...materiasSelect.filter((mat) => mat.check === true),
				];
			});
		}
	}, [materiasSelect, dispatch]);

	useEffect(() => {
		if (!materiasMalla) {
			dispatch(getMateriasMalla());
		} else {
			setMatCompile((anterior) => {
				return [
					...anterior,
					...materiasMalla.filter((mat) => mat.check === true),
				];
			});
		}
	}, [materiasMalla, dispatch]);

	const state = { matCompile };

	return <Page state={state} />;
}
