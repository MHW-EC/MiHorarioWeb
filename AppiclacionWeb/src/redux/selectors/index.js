import { get } from 'lodash';

export const isSearchingLoading = state => get(state, 'carreras.isLoading')
export const carrerasResults = state => get(state, 'carreras.carreras')