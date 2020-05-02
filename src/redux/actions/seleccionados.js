export const ADD_SEL = 'ADD_SEL'
export const REMOVE_SEL = 'REMOVE_SEL'

export const CLEAN_SEL = 'CLEAN_SEL'

export function addSeleccionado(teoricoId) {
    return { type: ADD_SEL, teoricoId}
}

export function removeSeleccionado(teoricoId) {
    return { type: REMOVE_SEL, teoricoId}
}

export function cleanSel() {
    return { type: CLEAN_SEL}
}
