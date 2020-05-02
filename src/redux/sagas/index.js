import { all } from 'redux-saga/effects'
//import paquetes from './paquetes'
import carreras from './carrera'
//import {teoricos, allteoricos } from './teorico';
import teoricos from './teorico';
import asociados from './asociados';
import generados from './generador'

export default function* rootSaga() {
    yield all([carreras(),teoricos(),asociados(),generados()]);
}