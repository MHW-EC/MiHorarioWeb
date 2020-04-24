import { all } from 'redux-saga/effects'
//import paquetes from './paquetes'
import carreras from './carrera'
import teoricos from './teorico';
import asociados from './asociados';

export default function* rootSaga() {
    yield all([carreras(),teoricos(),asociados()]);
}