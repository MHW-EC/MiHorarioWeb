import { put, takeEvery , call} from 'redux-saga/effects';
import { GET_ASOCIADO_START, GET_ASOCIADO_ERROR, GET_ASOCIADO_COMPLETE} from "../actions/asociado"
import { apiCall } from '../api';

function* getResultadosGenerados({ paquetes }) {
    try {
        const response = yield call(
            apiCall,
            `/generar`,
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
export default function* generados() {
    yield takeEvery(GET_ASOCIADO_START, getResultadosGenerados);
}