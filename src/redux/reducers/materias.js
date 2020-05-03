import {
  ADD_MATERIA, REMOVE_MATERIA, CLEAN_MATERIAS,
  UNCHECK_MATERIA, CHECK_MATERIA, SET_MATERIASMALLA
  , CLEAN_MATERIASMALLA
} from '../actions/materias'


export default function materias(state = { materias: [], malla: [] }, action) {
  switch (action.type) {
    case CHECK_MATERIA:
      return {
        ...state, materias: state.materias.map((mat) => {
          if (mat.codigo === action.materia.codigo) {
            return { ...mat, check: true }
          }
          return mat
        }), malla: state.malla.map((mat) => {
          if (mat.codigo === action.materia.codigo) {
            return { ...mat, check: true }
          }
          return mat
        })
      }
    case UNCHECK_MATERIA:
      return {
        ...state, materias: state.materias.map((mat) => {
          if (mat.codigo === action.materia.codigo) {
            return { ...mat, check: false }
          }
          return mat
        }), malla: state.malla.map((mat) => {
          if (mat.codigo === action.materia.codigo) {
            return { ...mat, check: false }
          }
          return mat
        })
      }
    case SET_MATERIASMALLA:
      return { ...state, malla: action.malla }
    case CLEAN_MATERIASMALLA:
      return { ...state, malla: [] }
    case CLEAN_MATERIAS:
      return { ...state, materias: [] }
    case ADD_MATERIA:
      return { ...state, materias: [...state.materias, action.materia] };
    case REMOVE_MATERIA:
      return { ...state, materias: state.materias.filter(mat => mat['codigo'] !== action.materia['codigo']),
    malla: state.malla.filter(mat => mat['codigo'] !== action.materia['codigo']) };
    default:
      return state
  }
} 