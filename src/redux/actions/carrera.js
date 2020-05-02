export const SET_CARRERA = 'SET_CARRERA'
export const GET_CARRERA = 'GET_CARRERA'
export const CLEAN_CARRERA = 'CLEAN_CARRERA'

export function setCarrera(carrera) {
    return { type: SET_CARRERA, carrera }
}

export function getCarrera() {
    return { type: GET_CARRERA }
}
export function cleanCarrera() {
    return { type: CLEAN_CARRERA }
}