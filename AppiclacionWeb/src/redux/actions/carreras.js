export const GET_CARRERAS = 'GET_CARRERAS'
export const SUCCESS_GET_CARRERAS = 'SUCCESS_GET_CARRERAS'
export const GET_FETCH_CARRERAS = 'GET_FETCH_CARRERAS'

export const GET_CARRERAS_START = 'GET_CARRERAS'
export const GET_CARRERAS_ERROR = 'GET_CARRERAS_ERROR'
export const GET_CARRERAS_COMPLETE = 'GET_CARRERAS_COMPLETE'

export const getCarreras = payload=> ({
    type: GET_CARRERAS, ...payload
})

export const successGetCarreras = payload=> ({
    type: SUCCESS_GET_CARRERAS, ...payload
})
export const getFetchCarreras = () => ({
    type: GET_FETCH_CARRERAS
})
