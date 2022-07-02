import { CONFIG_TYPES } from "../actions/configAction";
import { options } from "../consts/analysisOptions";

export const configInitialState = {
    idxAlgorithm: 0,
    algorithm: options[0].algorithm,
    option: [],
}

export const configReducer = (state, action) => {
    switch (action.type) {
        case CONFIG_TYPES.SET_ALGORITHM:
            return { ...state, idxAlgorithm: action.idxAlgorithm, algorithm: action.algorithm }
        case CONFIG_TYPES.ADD_OPTION:
            return { ...state, option: action.option }
        case CONFIG_TYPES.REMOVE_OPTION:
            let newOptions = state.option.filter((option) => option !== action.option)
            return { ...state, option: newOptions }
        case CONFIG_TYPES.CLEAR_CONFIG:
            return configInitialState
        default:
            return state;
    }
}