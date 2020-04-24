
import { combineReducers } from 'redux'
import paqueteria from './paquetes'
import seleccionados from './seleccionados'
import carreras from './carreras'

const todoApp = combineReducers({
    paqueteria,
    seleccionados,
    carreras
})

export default todoApp