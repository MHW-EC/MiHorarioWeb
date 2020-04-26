
export const GET_TEORICOS_START = 'GET_TEORICOS_START'
export const GET_TEORICOS_ERROR = 'GET_TEORICOS_ERROR'
export const GET_TEORICOS_COMPLETE = 'GET_TEORICOS_COMPLETE'

export const getTeoricos = (codigo) => ({
    type: GET_TEORICOS_START, codigo
})
