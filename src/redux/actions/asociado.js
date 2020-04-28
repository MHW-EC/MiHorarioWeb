export const GET_ASOCIADO_START = 'GET_ASOCIADO_START'
export const GET_ASOCIADO_ERROR = 'GET_ASOCIADO_ERROR'
export const GET_ASOCIADO_COMPLETE = 'GET_ASOCIADO_COMPLETE'

export const getAsociados = (teoricoId) => ({
    type: GET_ASOCIADO_START, teoricoId
})
