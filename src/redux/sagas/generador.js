import { put, takeEvery , call} from 'redux-saga/effects';
import { GET_RESULTADOS_GEN_START, GET_RESULTADOS_GEN_ERROR, GET_RESULTADOS_GEN_COMPLETE} 
from "../actions/generador"
import { apiCall } from '../api';

function* getResultadosGenerados({paquetes}) {

    //const dispatch = useDispatch();
    
    try {//url, data, headers, method
        const response = yield call(
            apiCall,
            `/generar`,
            JSON.stringify(paquetes),
            {"Content-Type":"application/json"},
            'PUT'
        );
        if (typeof(response) !== "undefined" && typeof(response.data) !== "undefined" ){
            yield put({ type: GET_RESULTADOS_GEN_COMPLETE, response})
        }
    } catch (err) {
        console.log(err)
        //yield put({type: GET_RESULTADOS_GEN_ERROR, err})
    }
}
//Watcher _START
export default function* generados() {
    yield takeEvery(GET_RESULTADOS_GEN_START, getResultadosGenerados);
}