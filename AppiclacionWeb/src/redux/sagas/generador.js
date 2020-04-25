import { put, takeEvery , call} from 'redux-saga/effects';
import { GET_RESULTADOS_GEN_START, GET_RESULTADOS_GEN_ERROR, GET_RESULTADOS_GEN_COMPLETE} 
from "../actions/generador"
import { apiCall } from '../api';

function* getResultadosGenerados({ paquetes }) {
    try {//url, data, headers, method
        console.log("Se llamo a generados")
        const response = yield call(
            apiCall,
            `/generar`,
            {id:'hola2'},
            ['Access-Control-Allow-Origin', '*'],
            'GET'
        );
        console.log(response)//resto me retorna lo que mando por res.send()
        //yield put({ type: GET_RESULTADOS_GEN_COMPLETE, response})
    } catch (err) {
        console.log(err)
        //yield put({type: GET_RESULTADOS_GEN_ERROR, err})
    }
}
//Watcher _START
export default function* generados() {
    yield takeEvery(GET_RESULTADOS_GEN_START, getResultadosGenerados);
}