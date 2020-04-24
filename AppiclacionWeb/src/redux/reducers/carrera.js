import { SET_CARRERA, GET_CARRERA } from '../actions/carrera'



export default function carrera(state = {}, action) {
  switch (action.type) {
    case SET_CARRERA:
      return { carrera: action.carrera };
    case GET_CARRERA:
      return state;
    default:
      return state
  }
} 