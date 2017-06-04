import {ENTITY_REGISTER_ERROR} from '../constants/actionTypes';

const initState = {
    hasError: false,
    error: ''
};

const reducer = (state = initState, action) => {
    switch (action.type) {
        case ENTITY_REGISTER_ERROR:
        return {
            ...state,
            hasError: true,
            error: action.error
        };
        default:
            return state;
    }
};

export default reducer;
