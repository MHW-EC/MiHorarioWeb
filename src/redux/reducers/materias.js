import { ADD_MATERIAS, REMOVE_MATERIAS, GET_MATERIAS, CLEAN_MATERIAS } from '../actions/materias'


export default function carrera(state = {materias:[]}, action) {
  switch (action.type) {
    case CLEAN_MATERIAS:
      return { ...state, materias: []}
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