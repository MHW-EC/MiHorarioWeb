import { GET_ALLTEORICOS_COMPLETE, GET_TEORICOS_COMPLETE } from '../actions/teorico'

export default function teoricos(state = {teoricos:[], teoricosBase:[]}, { type, codigo, response }) {
    
    switch (type) {
       
        case GET_ALLTEORICOS_COMPLETE:
            return {...state, teoricosBase: response.data}; 
       
        case GET_TEORICOS_COMPLETE:
           console.log("completado ter")
            return {...state, teoricos: 
                [...state.teoricos, {codigo, isLoading: false, paralelos: response.data }]}; 
        default:
            return state
    }
}
/*case GET_TEORICOS_START:
      return { ...state, codigo: {isLoading: true} };
    case GET_TEORICOS_ERROR:
      return { ...state, codigo: {isLoading: false, paralelos: null }};
    case GET_TEORICOS_COMPLETE:
      return { ...state, codigo: {isLoading: false, paralelos: response.data }};
    default:
      return state*/

      /*case GET_TEORICOS_COMPLETE:
            return {...state, teoricos: 
                [state.teoricos.map((obj) => {
                    if (obj.codigo === codigo) {
                        return {codigo, isLoading: false, paralelos: response.data }
                    } return obj
                })]}; */