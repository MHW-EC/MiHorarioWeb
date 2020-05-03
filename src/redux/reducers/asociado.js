import { CLEAN_ASOCIADOS, GET_ASOCIADO_COMPLETE } from '../actions/asociado'

export default function teoricos(state = {asociados:[]}, { type, teoricoId, response }) {
    switch (type) {
        case CLEAN_ASOCIADOS:
            return {...state, asociados: []}
        case GET_ASOCIADO_COMPLETE:
            return {...state, asociados: 
                [...state.asociados, {teoricoId, isLoading: false, paralelos: response.data }]}; 
        default:
            return state
    }
}