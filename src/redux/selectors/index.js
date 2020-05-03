import { get } from 'lodash';

export const isSearchingLoading = state => get(state, 'carreras.isLoading')
export const carrerasResults = state => get(state, 'carreras.carreras')

export const carreraSeleccionada = state => get(state, 'carrera.carrera')
export const materiasSeleccionadas = state => get(state, 'materias.materias')
export const materiasMalla = state => get(state, 'materias.malla')


export const resultadosGenerados = state => get(state, 'generador.generados')

export const teoricosResults = (state,codigo) =>{
    return get(state, 'teoricos.teoricos').find(par => par.codigo === codigo)
}

export const allTeoricosResults = (state,codigo) =>{
    return get(state, 'teoricos.teoricosBase')
}

export const asociadosResults = (state,teoricoId) =>{
    return get(state, 'asociados.asociados').find(par => par.teoricoId === teoricoId)
}

export const seleccionados = state => get(state, 'seleccionados')
export const paqueteria = state => get(state, 'paqueteria')

/*
export const asociadosResults = (state,teoricoId) =>{
    return get(state, 'asociados.asociados').find(par => par.teoricoId === teoricoId)
} */