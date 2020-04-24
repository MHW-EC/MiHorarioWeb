import { put, takeLatest , call} from 'redux-saga/effects';
import { SET_CARRERA, GET_CARRERA } from '../actions/carrera

function* setCarrera({ carrera }) {
    try {
        yield put({ type: GET_CARRERAS_COMPLETE, carrera})
    } catch (err) {
        console.log(err)
    }
}
//Watcher _START
export default function* carreras() {
    yield takeLatest(SET_CARRERA, setCarrera);
}