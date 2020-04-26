import { put, takeEvery , call} from 'redux-saga/effects';
import { GET_RESULTADOS_GEN_START, GET_RESULTADOS_GEN_ERROR, GET_RESULTADOS_GEN_COMPLETE} 
from "../actions/generador"
import { apiCall } from '../api';

function* getResultadosGenerados({paquetes}) {

    //const dispatch = useDispatch();
    
    try {//url, data, headers, method
        console.log("Se llamo a generados", paquetes)
        const response = yield call(
            apiCall,
            `/generar`,
            {'paquetes':paquetes},
            null,
            'PUT'
        );
        console.log(response.data)//resto me retorna lo que mando por res.send()
        yield put({ type: GET_RESULTADOS_GEN_COMPLETE, generados:response.data})
    } catch (err) {
        console.log(err)
        //yield put({type: GET_RESULTADOS_GEN_ERROR, err})
    }
}
//Watcher _START
export default function* generados() {
    yield takeEvery(GET_RESULTADOS_GEN_START, getResultadosGenerados);
}