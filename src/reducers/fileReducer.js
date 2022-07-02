import { FILE_TYPES } from "../actions/fileAction";

export const fileInitialState = {
    dropDepth: 0,
    inDropZone: false,
    file: null,
    headers: []
};

export const fileReducer = (state, action) => {
    switch (action.type) {
        case FILE_TYPES.DROP_DEPTH:
            return { ...state, dropDepth: action.dropDepth };
        case FILE_TYPES.IN_DROP_ZONE:
            return { ...state, inDropZone: action.inDropZone };
        case FILE_TYPES.ADD_FILE:
            return { ...state, file: action.file };
        case FILE_TYPES.SET_HEADERS:
            return { ...state, headers: action.headers };
        case FILE_TYPES.CLEAR_FILE:
            return fileInitialState;
        default:
            return state;
    }
};