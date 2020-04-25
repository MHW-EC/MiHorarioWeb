import { GET_RESULTADOS_GEN_START, GET_RESULTADOS_GEN_ERROR, GET_RESULTADOS_GEN_COMPLETE } 
from '../actions/generador'


export default function carrera(state = {generados:[]}, action) {
  switch (action.type) {
    case GET_RESULTADOS_GEN_COMPLETE:
      return {...state, generados: [action.response] };
    default:
      return state
  }
} 