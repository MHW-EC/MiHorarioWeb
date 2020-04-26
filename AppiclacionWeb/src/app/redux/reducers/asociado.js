import { GET_ASOCIADO_START, GET_ASOCIADO_ERROR, GET_ASOCIADO_COMPLETE } from '../actions/asociado'

export default function teoricos(state = {asociados:[]}, { type, teoricoId, response }) {
    switch (type) {
        /*case GET_TEORICOS_START:
            return {...state, teoricos: [state.teoricos ,{codigo,isLoading: true}]};
        case GET_TEORICOS_ERROR:
            return {...state, teoricos: 
                [state.teoricos.map((obj) => {
                    if (obj.codigo === codigo) {
                        return {codigo, isLoading: false, paralelos: null }
                    } return obj
                })]}; 
        */case GET_ASOCIADO_COMPLETE:
            return {...state, asociados: 
                [...state.asociados, {teoricoId, isLoading: false, paralelos: response.data }]}; 
        default:
            return state
    }
}