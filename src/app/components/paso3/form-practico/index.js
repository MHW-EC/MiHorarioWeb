import React, { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { asociadosResults as asociadosSelector } from '../../../../redux/selectors';
import { getAsociados } from '../../../../redux/actions/asociado';
import { addPaquete, removePaquete } from '../../../../redux/actions/paquetes';

import Page from './page';

export default function ActionsInExpansionPanelSummary(props) {
	const [teoricoid, setTeoricoId] = useState();
	const [teorico, setTeorico] = useState();

	useEffect(() => {
		setTeoricoId(props.teoricoid);
	}, [props.teoricoid]);

	useEffect(() => {
		setTeorico(props.teorico);
	}, [props.teorico]);

	const dispatch = useDispatch();
	const parAsociados = useSelector((state, codigo) =>
		asociadosSelector(state, teoricoid)
	);

	useEffect(() => {
		if (!parAsociados) {
			dispatch(getAsociados(teoricoid));
		}
	});

	const handleAddPaquete = (evento, teorico, practico) => {
		evento.target.checked
			? dispatch(addPaquete([teorico, practico], teoricoid, practico['_id']))
			: dispatch(removePaquete(teoricoid, practico['_id']));
	};

	const state = { parAsociados, teorico };
	const func = { handleAddPaquete };

	return <Page state={state} func={func} />;
}
