import {
	GET_PROFESOR_COMPLETE,
	GET_PROFESOR_ERROR,
	GET_PROFESOR_START,
} from '../actions/profesor';

export default function teoricos(
	state = {state: "", array:[]} ,{type, response}
) {
	switch (type) {
		case GET_PROFESOR_START:
			return {
				state: "GET_PROFESOR_START" , array: [...state.array]
			};
		case GET_PROFESOR_COMPLETE:
			return {
				state: "GET_PROFESOR_COMPLETE" , array: [...state.array,response.data]
			};
		case GET_PROFESOR_ERROR: 
			return {
				state: "GET_PROFESOR_COMPLETE" , array: [...state.array]
			}
		default:
			return state;
	}
}
