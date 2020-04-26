import { GET_CARRERAS_START, GET_CARRERAS_ERROR, GET_CARRERAS_COMPLETE } from '../actions/carreras'



export default function carreras(state = {}, action) {
  switch (action.type) {
    case GET_CARRERAS_START:
      return { ...state, isLoading: true };
    case GET_CARRERAS_ERROR:
      return { ...state, isLoading: false, carreras: null };
    case GET_CARRERAS_COMPLETE:
      return { ...state, isLoading: false, carreras: action.response.data };
    default:
      return state
  }
} 