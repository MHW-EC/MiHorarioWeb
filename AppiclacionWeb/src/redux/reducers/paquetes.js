import { ADD_PAQUETE, REMOVE_PAQUETE } from '../actions/paquetes'

export default function paqueteria(state = [], action) {
  switch (action.type) {
    case ADD_PAQUETE:
      return [...state,
        {id: typeof(action.asociadoId) === "undefined" ? action.teoricoId :action.asociadoId,
        array: action.array,
        teoricoId: action.teoricoId  }
     ]
    case REMOVE_PAQUETE:
        let selector = typeof(action.asociadoId) === "undefined" ? action.teoricoId :action.asociadoId
        return state.filter(paq => paq.id === selector)
    default:
      return state
  }
}