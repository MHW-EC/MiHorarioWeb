import { get } from 'lodash';

export const isSearchingLoading = state => get(state, 'carreras.isLoading')
export const carrerasResults = state => get(state, 'carreras.carreras')

export const carreraSeleccionada = state => get(state, 'carrera.carrera')
export const materiasSeleccionadas = state => get(state, 'materias.materias')

/*
var object = { 'a': [{ 'b': { 'c': 3 } }] };
 
_.get(object, 'a[0].b.c');
// => 3
 
_.get(object, ['a', '0', 'b', 'c']);
// => 3*/

export const teoricosResults = (state,codigo) => get(state, `teoricos.${codigo}.paralelos`)