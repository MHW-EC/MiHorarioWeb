import { put, takeLatest, call } from 'redux-saga/effects';
import {
	GET_CARRERAS_START,
	GET_CARRERAS_COMPLETE,
	GET_CARRERAS_ERROR,
} from '../actions/carreras';

import { apiCall } from '../api';
function* getCarreras({ payload }) {
	try {
		const response = yield call(apiCall, '/carrera', null, null, 'GET');
		yield put({ type: GET_CARRERAS_COMPLETE, response });
	} catch (err) {
		yield put({ type: GET_CARRERAS_ERROR, err });
	}
}
//Watcher _START
export default function* carreras() {
	yield takeLatest(GET_CARRERAS_START, getCarreras);
}
