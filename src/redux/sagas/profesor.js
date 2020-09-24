import { put, takeEvery, call } from 'redux-saga/effects';
import {
	GET_PROFESOR_COMPLETE,
	GET_PROFESOR_ERROR,
	GET_PROFESOR_START,
} from '../actions/profesor';

import { apiCall } from '../api';

function* getProfesor({nombre, codigo, nombreMateria}) {
	try {
		const response = yield call(
			apiCall,
			`/profesor/${nombre}/${codigo}/${nombreMateria}`,
			null,
			null,
			'GET'
		);
		yield put({ type: GET_PROFESOR_COMPLETE, nombre, response });
	} catch (err) {
		yield put({ type: GET_PROFESOR_ERROR, err });
	}
}
export default function* teoricos() {
	yield takeEvery(GET_PROFESOR_START, getProfesor);
}
