import { SET_CARRERA, GET_CARRERA } from '../actions/carrera'



export default function carreras(state = {}, action) {
  switch (action.type) {
    case SET_CARRERA:
      return { ...state, carrera: action.carrera };
    default:
      return state
  }
} 