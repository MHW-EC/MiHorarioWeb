import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Button } from '@material-ui/core';
import { teoricosResults as paralelosSelector } from '../../../../redux/selectors';
import { getTeoricos } from '../../../../redux/actions/teorico';

import {
	enqueueSnackbar as enqueueSnackbarAction,
	closeSnackbar as closeSnackbarAction,
} from '../../../../redux/actions/notifier';

import Page from './page';

export default function SingleLineGridList(props) {
	const [materia] = useState(props.materia);

	//const [paralelos,setParalelos] = useState();
	const dispatch = useDispatch();
	const parTeorico = useSelector((state, codigo) =>
		paralelosSelector(state, materia['codigo'])
	);
	const [isMobile] = useState(props.isMobile);
	const [nCols, setnCols] = useState(); //props.isMobile ? parTeorico.length > 1 ? 1.5 : 1  : parTeorico.length > 1 ? 1.1 : 1);

	useEffect(() => {
		if (!parTeorico) {
			dispatch(getTeoricos(materia['codigo']));
		}
	});

	useEffect(() => {
		const enqueueSnackbar = (...args) =>
			dispatch(enqueueSnackbarAction(...args));
		const closeSnackbar = (...args) => dispatch(closeSnackbarAction(...args));
		enqueueSnackbar({
			message: 'Seleccione los paralelos asociados por cada paralelo teórico',
			options: {
				persist: true,
				preventDuplicate: true,
				key: 'alter-par-asociados',
				variant: 'warning',
				action: (key) => <Button onClick={() => closeSnackbar(key)}>OK</Button>,
				style: { whiteSpace: 'pre-line', textAlign: 'left' },
			},
		});
	}, [dispatch]);

	useEffect(() => {
		if (parTeorico) {
			setnCols(parTeorico['paralelos'].length <= 1 ? 1 : 1.1);
		}
	}, [parTeorico, isMobile]);

	const state = { nCols, isMobile, materia, parTeorico };

	return <Page state={state} />;
}
