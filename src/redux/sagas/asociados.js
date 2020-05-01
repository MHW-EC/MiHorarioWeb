import { put, takeEvery , call} from 'redux-saga/effects';
import { GET_ASOCIADO_START, GET_ASOCIADO_ERROR, GET_ASOCIADO_COMPLETE} from "../actions/asociado"
import { apiCall } from '../api';

function* getAsociados({ teoricoId }) {
    try {
        console.log('se ejecuto:', teoricoId)
        const response = yield call(
            apiCall,
            `/practico/${teoricoId}`,
            null,
            null,
            'GET'
        );
        
        yield put({ type: GET_ASOCIADO_COMPLETE, teoricoId, response})
    } catch (err) {
        console.log(err)
        yield put({type: GET_ASOCIADO_ERROR, err})
    }
}
//Watcher _START
export default function* asociados() {
    yield takeEvery(GET_ASOCIADO_START, getAsociados);
}