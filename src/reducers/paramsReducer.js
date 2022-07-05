import { PARAMS_TYPES } from "../actions/paramsAction"

export const paramsInitialState = {
    dependiente: '',
    independiente: '',
    time: '',
    layers: [],
    iteracion: [],
    columns: [],
    predicts: []
}

export const paramsReducer = (state, action) => {
    switch (action.type) {
        case PARAMS_TYPES.SET_DEPENDIENTE:
            return { ...state, dependiente: action.dependiente }
        case PARAMS_TYPES.SET_INDEPENDIENTE:
            return { ...state, independiente: action.independiente }
        case PARAMS_TYPES.SET_TIME:
            return { ...state, time: action.time }
        case PARAMS_TYPES.SET_LAYERS:
            return { ...state, layers: action.layers }
        case PARAMS_TYPES.SET_ITERACION:
            return { ...state, iteracion: action.iteracion }
        case PARAMS_TYPES.CLEAR_PARAMS:
            return paramsInitialState
        case PARAMS_TYPES.ADD_COLUMNS:
            return { ...state, columns: action.columns }
        case PARAMS_TYPES.ADD_PREDICTS:
            return { ...state, predicts: [...state.predicts, action.predicts] }
        default:
            return state;
    }
}