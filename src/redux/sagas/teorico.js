import { put, takeEvery, takeLatest, call } from 'redux-saga/effects';
import {
	GET_TEORICOS_START,
	GET_TEORICOS_ERROR,
	GET_TEORICOS_COMPLETE,
} from '../actions/teorico';
import {
	GET_ALLTEORICOS_START,
	GET_ALLTEORICOS_ERROR,
	GET_ALLTEORICOS_COMPLETE,
} from '../actions/teorico';

import { apiCall } from '../api';
function* getTeoricos({ codigo }) {
	try {
		const response = yield call(
			apiCall,
			`/teorico/${codigo}/join`,
			null,
			null,
			'GET'
		);
		yield put({ type: GET_TEORICOS_COMPLETE, codigo, response });
	} catch (err) {
		yield put({ type: GET_TEORICOS_ERROR, err });
	}
}
function* getAllTeoricos() {
	try {
		const response = yield call(apiCall, `/teorico/`, null, null, 'GET');
		yield put({ type: GET_ALLTEORICOS_COMPLETE, response });
	} catch (err) {
		yield put({ type: GET_ALLTEORICOS_ERROR, err });
	}
}
//Watcher _START
export default function* teoricos() {
	yield takeEvery(GET_TEORICOS_START, getTeoricos);
	yield takeLatest(GET_ALLTEORICOS_START, getAllTeoricos);
}
