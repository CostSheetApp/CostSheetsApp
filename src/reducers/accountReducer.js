import {ACCOUNT_LOGIN,ACCOUNT_LOGOUT,AUTHORIZED_ACCOUNT,UNAUTHORIZED_ACCOUNT,EMAIL_NOT_FOUND} from '../constants/actionTypes'

const initState = {
    username: '',
    isLoading: false, 
    isAuthenticated: false,
    hasError: false,
    error: ''
}

const reducer = (state = initState, action) => {
    switch (action.type) {
        case ACCOUNT_LOGIN:
        return {
            ...state,
            isLoading: true
        }
        case AUTHORIZED_ACCOUNT:
        return{
            ...state,
            isLoading: false,
            isAuthenticated: true,
            username: action.username,
            hasError:false,
            error:''
        }
        case UNAUTHORIZED_ACCOUNT:
        return {
            ...state,
            isLoading: false,
            hasError: true,
            error: action.error
        }
        case ACCOUNT_LOGOUT: 
        return{
            ...state,
            isAuthenticated: false
        }
        case EMAIL_NOT_FOUND:
        return {
            ...state,
            hasError: true,
            error: action.error
        }
        default:
            return state
    }
}

export default reducer
