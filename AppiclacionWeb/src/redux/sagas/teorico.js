import { put, takeEvery , call} from 'redux-saga/effects';
import { GET_TEORICOS_START, GET_TEORICOS_ERROR, GET_TEORICOS_COMPLETE} from "../actions/teorico"

import { apiCall } from '../api';
function* getTeoricos({ codigo }) {
    try {

        const response = yield call(
            apiCall,
            `/teorico/${codigo}`,
            null,
            null,
            'GET'
        );
        console.log('se ejecuto:', codigo)
        yield put({ type: GET_TEORICOS_COMPLETE, codigo, response})
    } catch (err) {
        console.log(err)
        yield put({type: GET_TEORICOS_ERROR, err})
    }
}
//Watcher _START
export default function* teoricos() {
    yield takeEvery(GET_TEORICOS_START, getTeoricos);
}