import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import {
	checkMateria,
	unCheckMateria,
	removeMateria,
} from '../../../../redux/actions/materias';
import { useDispatch } from 'react-redux';

import Page from './page';

export default function Celda(props) {
	const [materia] = useState(props.materia);

	const [marcado, setMarcado] = useState(props.materia.check);

	const dispatch = useDispatch();

	const fromMalla = props.fromMalla;

	useEffect(() => {
		setMarcado(props.materia.check);
		if (props.materia.check) {
			dispatch(checkMateria(materia));
		}
	}, [props.materia.check, marcado, dispatch, materia]);

	const onCheck = (bool) => {
		setMarcado(!marcado);
		bool ? dispatch(checkMateria(materia)) : dispatch(unCheckMateria(materia));
	};
	const handleBorrar = () => {
		dispatch(removeMateria(materia));
	};

	const state = { materia, marcado, fromMalla };
	const func = { handleBorrar, onCheck };

	return <Page state={state} func={func} />;
}

Celda.propTypes = {
	materia: PropTypes.object.isRequired,
	materiasSelect: PropTypes.array,
};
