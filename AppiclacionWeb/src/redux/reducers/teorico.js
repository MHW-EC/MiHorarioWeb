import { GET_TEORICOS_START, GET_TEORICOS_ERROR, GET_TEORICOS_COMPLETE } from '../actions/teorico'

export default function carreras(state = {}, {type, codigo, response}) {
  switch (type) {
    case GET_TEORICOS_START:
      return { ...state, codigo: {isLoading: true} };
    case GET_TEORICOS_ERROR:
      return { ...state, codigo: {isLoading: false, paralelos: null }};
    case GET_TEORICOS_COMPLETE:
      return { ...state, codigo: {isLoading: false, paralelos: response.data }};
    default:
      return state
  }
} 