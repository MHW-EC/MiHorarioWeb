import {
	GET_ALLTEORICOS_COMPLETE,
	GET_TEORICOS_COMPLETE,
} from '../actions/teorico';

export default function teoricos(
	state = { teoricos: [], teoricosBase: [] },
	{ type, codigo, response }
) {
	switch (type) {
		case GET_ALLTEORICOS_COMPLETE:
			return { ...state, teoricosBase: response.data };

		case GET_TEORICOS_COMPLETE:
			return {
				...state,
				teoricos: [
					...state.teoricos,
					{ codigo, isLoading: false, paralelos: response.data },
				],
			};
		default:
			return state;
	}
}
