export const GET_RESULTADOS_GEN_START = 'GET_RESULTADOS_GEN_START'
export const GET_RESULTADOS_GEN_ERROR = 'GET_RESULTADOS_GEN_ERROR'
export const GET_RESULTADOS_GEN_COMPLETE = 'GET_RESULTADOS_GEN_COMPLETE'

export const getResultadosGenerados = (paquetes) => ({
    type: GET_RESULTADOS_GEN_START, paquetes
})
