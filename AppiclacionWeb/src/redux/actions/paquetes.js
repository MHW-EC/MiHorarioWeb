/*
cambiar el estado del boton anadir/quitar -> este boton se activa si al menos un checkbox se activa en par asociados
Si se anade se de agregar un nuevo paquete 
Si se remueve se eliminan todos los paquetes anadidos, clear
Se necesita un objeto que represente cada componente card paralelo clave el id del paralelo teorico
como valor un array de paquetes(array) que contenga las materias seleccionadas

Anadir paquete (checkbox)
quitar paquete (checkbox)

Obtener todos los paquetes

*/
export const ADD_PAQUETE = 'ADD_PAQUETE'
export const REMOVE_PAQUETE = 'REMOVE_PAQUETE'

export function addPaquete(array, teoricoId, asociadoId) {
    return { type: ADD_PAQUETE, teoricoId, asociadoId, array }
}

export function removePaquete(array, teoricoId) {
    return { type: REMOVE_PAQUETE, teoricoId, array }
}
