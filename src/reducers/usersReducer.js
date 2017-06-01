import {USER_ADDED,ADDING_USER,ADDING_USER_ERROR,USER_EDITED,EDITING_USER,EDITING_USER_ERROR,USERS_FETCHED,FETCHING_USERS,FETCHING_USERS_ERROR} from '../constants/actionTypes';

const initState = {
    list: [],
    loading:false,
    isSaving: false
};

const reducer = (state = initState, action) => {
    switch (action.type) {
        case FETCHING_USERS:
        return {
            ...state,
            loading:true
        };
        case USERS_FETCHED:
        return {
            ...state,
            list: action.list,
            loading:false
        };        
        case FETCHING_USERS_ERROR:
        return{
            ...state,
            loading: false
        };
        case USER_ADDED:
        return {
            ...state,
            isSaving: false,
            list: [
                action.payload,
                ...state.list                
            ]
        };
        case ADDING_USER:
        return{
            ...state,
            isSaving: true
        };
        case ADDING_USER_ERROR:
        return{
            ...state,
            isSaving: false
        };
        case USER_EDITED:
        return {
            ...state,
            isSaving: false,
            list: [
                action.payload,
                ...state.list                
            ]
        };
        case EDITING_USER:
        return{
            ...state,
            isSaving: true
        };
        case EDITING_USER_ERROR:
        return{
            ...state,
            isSaving: false
        };
        default:
            return state;
    }
};

export default reducer;

