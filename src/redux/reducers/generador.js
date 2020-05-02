import { CLEAN_RESULTADOS, GET_RESULTADOS_GEN_COMPLETE } 
from '../actions/generador'


export default function carrera(state = {generados:[]}, action) {
  switch (action.type) {
    case CLEAN_RESULTADOS:
      return { generados: [] }
    case GET_RESULTADOS_GEN_COMPLETE:
      return {...state, generados: action.response.data };
    default:
      return state
  }
} 