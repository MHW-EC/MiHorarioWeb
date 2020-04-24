
import { combineReducers } from 'redux'
import paqueteria from './paquetes'
import seleccionados from './seleccionados'
import carreras from './carreras'

export const initialState = {
    carreras: [],
    carrera: {},
    paquete: [],
    paquete_seleccionados: [],
    isMobile: false,
    horarios: [],
    hoaraio: {}
};

const todoApp = combineReducers({
    paqueteria,
    seleccionados,
    carreras
})

export default todoApp