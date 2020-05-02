
import { ADD_SEL, REMOVE_SEL, CLEAN_SEL } from '../actions/seleccionados'

export default function seleccionados(state = [], action) {
  switch (action.type) {
    case CLEAN_SEL:
      return []
    case ADD_SEL:
      return [...state, action.teoricoId]
    case REMOVE_SEL:
      return state.filter(paq => paq !== action.teoricoId)
    default:
      return state
  }
}