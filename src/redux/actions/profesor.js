
export const GET_PROFESOR_START = 'GET_PROFESOR_START'
export const GET_PROFESOR_ERROR = 'GET_PROFESOR_ERROR'
export const GET_PROFESOR_COMPLETE = 'GET_PROFESOR_COMPLETE'

export const getProfesor = (nombre, codigo, nombreMateria) => ({
    type: GET_PROFESOR_START, nombre, codigo, nombreMateria
})
