import { ACCOUNT_LOGIN, ACCOUNT_LOGOUT, AUTHORIZED_ACCOUNT, UNAUTHORIZED_ACCOUNT, EMAIL_NOT_FOUND, ACCOUNT_REGISTER } from '../constants/actionTypes';


const initState = {
    username: '',
    entityId: 0,
    isLoading: false,
    isAuthenticated: false,
    hasError: false,
    error: ''
};

const reducer = (state = initState, action) => {
    switch (action.type) {
        case ACCOUNT_LOGIN:
            return {
                ...state,
                isLoading: true
            };
        case AUTHORIZED_ACCOUNT:
            return {
                ...state,
                isLoading: false,
                isAuthenticated: true,
                username: action.username,
                entityId: action.entityId,
                hasError: false,
                error: ''
            };
        case UNAUTHORIZED_ACCOUNT:
            return {
                ...state,
                isLoading: false,
                hasError: true,
                error: action.error
            };
        case ACCOUNT_LOGOUT:
            return initState;
        case EMAIL_NOT_FOUND:
            return {
                ...state,
                hasError: true,
                error: action.error
            };
        case ACCOUNT_REGISTER:
            return {
                ...state,
                hasError: false,
                error: ''
            };
        default:
            return state;
    }
};

export default reducer;
