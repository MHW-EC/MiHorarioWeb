
export const GET_TEORICOS_START = 'GET_TEORICOS_START'
export const GET_TEORICOS_ERROR = 'GET_TEORICOS_ERROR'
export const GET_TEORICOS_COMPLETE = 'GET_TEORICOS_COMPLETE'

export const getTeoricos = (codigo) => ({
    type: GET_TEORICOS_START, codigo
})

//solo traera codigo y nombre
export const GET_ALLTEORICOS_START = 'GET_ALLTEORICOS_START'
export const GET_ALLTEORICOS_ERROR = 'GET_ALLTEORICOS_ERROR'
export const GET_ALLTEORICOS_COMPLETE = 'GET_ALLTEORICOS_COMPLETE'

export const getAllTeoricos = () => ({
    type: GET_ALLTEORICOS_START
})
