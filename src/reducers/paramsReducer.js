import { PARAMS_TYPES } from "../actions/paramsAction"

export const paramsInitialState = {
    dependiente: '',
    independiente: '',
    time: ''
}

export const paramsReducer = (state, action) => {
    switch (action.type) {
        case PARAMS_TYPES.SET_DEPENDIENTE:
            return { ...state, dependiente: action.dependiente }
        case PARAMS_TYPES.SET_INDEPENDIENTE:
            return { ...state, independiente: action.independiente }
        case PARAMS_TYPES.SET_TIME:
            return { ...state, time: action.time }
        case PARAMS_TYPES.CLEAR_PARAMS:
            return paramsInitialState
        default:
            return state;
    }
}