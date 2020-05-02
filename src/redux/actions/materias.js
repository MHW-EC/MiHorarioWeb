export const ADD_MATERIAS = 'ADD_MATERIAS'
export const REMOVE_MATERIAS = 'REMOVE_MATERIAS'

export const GET_MATERIAS = 'GET_MATERIAS'
export const CLEAN_MATERIAS = 'CLEAN_MATERIAS'

export function addMateria(materia) {
    return { type: ADD_MATERIAS, materia }
}

export function removeMateria(materia) {
    return { type: REMOVE_MATERIAS, materia }
}

export function getMaterias() {
    return { type: GET_MATERIAS }
}

export function cleanMaterias() {
    return { type: CLEAN_MATERIAS }
}
