import { combineReducers } from 'redux';
import paqueteria from './paquetes';
import seleccionados from './seleccionados';
import carreras from './carreras';
import carrera from './carrera';
import materias from './materias';
import teoricos from './teorico';
import asociados from './asociado';
import generador from './generador';
import notifier from './notifier';
import profesor from './profesor';

export const initialState = {
	carreras: [],
	carrera: {},
	paquete: [],
	paquete_seleccionados: [],
	isMobile: false,
	horarios: [],
	hoaraio: {},
};

const todoApp = combineReducers({
	paqueteria,
	seleccionados,
	carreras,
	carrera,
	materias,
	teoricos,
	asociados,
	generador,
	notifier,
	profesor
});

export default todoApp;
