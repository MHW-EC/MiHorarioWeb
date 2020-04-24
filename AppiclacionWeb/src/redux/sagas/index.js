import { all } from 'redux-saga/effects'
//import paquetes from './paquetes'
import carreras from './carreras'


export default function* rootSaga() {
    yield all([carreras()]);
}