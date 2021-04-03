export const ADD_MATERIA = 'ADD_MATERIA'
export const REMOVE_MATERIA = 'REMOVE_MATERIA'

export const CHECK_MATERIA = 'CHECK_MATERIAS'
export const UNCHECK_MATERIA = 'UNCHECK_MATERIAS'

export const GET_MATERIAS = 'GET_MATERIAS'
export const CLEAN_MATERIAS = 'CLEAN_MATERIAS'

export const GET_MATERIASMALLA = 'GET_MATERIASMALLA'
export const SET_MATERIASMALLA = 'SET_MATERIASMALLA'
export const CLEAN_MATERIASMALLA = 'CLEAN_MATERIASMALLA'



export function addMateria(materia) {
    return { type: ADD_MATERIA, materia }
}

export function removeMateria(materia) {
    return { type: REMOVE_MATERIA, materia }
}

export function checkMateria(materia) {
    return { type: CHECK_MATERIA, materia }
}

export function unCheckMateria(materia) {
    return { type: UNCHECK_MATERIA, materia }
}

export function getMaterias() {
    return { type: GET_MATERIAS }
}

export function cleanMaterias() {
    return { type: CLEAN_MATERIAS }
}

export const getMateriasMalla = () => ({
    type: GET_MATERIASMALLA
})
export const setMateriasMalla = (arrayMalla) => ({
    type: SET_MATERIASMALLA , malla:arrayMalla
})
export const cleanMateriasMalla = () => ({
    type: CLEAN_MATERIASMALLA
})