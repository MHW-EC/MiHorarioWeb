import { ADD_MATERIAS, REMOVE_MATERIAS, GET_MATERIAS } from '../actions/materias'


export default function carrera(state = {materias:[]}, action) {
  switch (action.type) {
    case ADD_MATERIAS:
      return {...state, materias: [...state.materias, action.materia] };
    case REMOVE_MATERIAS:
      return {...state, materias: state.materias.filter(mat => mat['codigo'] !== action.materia['codigo']) };
    case GET_MATERIAS:
      return state;
    default:
      return state
  }
} 