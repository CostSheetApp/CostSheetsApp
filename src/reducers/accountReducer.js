import {ACCOUNT_LOGIN,ACCOUNT_LOGOUT,AUTHORIZED_ACCOUNT,UNAUTHORIZED_ACCOUNT} from '../constants/actionTypes'

const initState = {
    username: '',
    isLoging: false, 
    isAuthenticated: false,
    hasError: false,
    error: ''
}

const reducer = (state = initState, action) => {
    switch (action.type) {
        case ACCOUNT_LOGIN:
        return {
            ...state,
            isLoging: true
        }
        case AUTHORIZED_ACCOUNT:
        return{
            ...state,
            isLoging: false,
            isAuthenticated: true,
            username: action.username
        }
        case UNAUTHORIZED_ACCOUNT:
        return {
            ...state,
            isLoging: false,
            hasError: true,
            error: action.error
        }
        case ACCOUNT_LOGOUT: 
        return{
            ...state,
            isAuthenticated: false
        }
        default:
            return state
    }
}

export default reducer
