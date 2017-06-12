import {PROJECTS_FETCHED,FETCHING_PROJECTS,FETCHING_PROJECTS_ERROR,PROJECT_ADDED,ADDING_PROJECT,ADDING_PROJECT_ERROR,PROJECT_EDITED,EDITING_PROJECT,EDITING_PROJECT_ERROR} from '../constants/actionTypes';

const initState = {
    list: [],
    loading:false,
    isSaving: false
};

const reducer = (state = initState, action) => {
    switch (action.type) {
        case FETCHING_PROJECTS:
        return {
            ...state,
            loading:true
        };
        case PROJECTS_FETCHED:
        return {
            ...state,
            list: action.list,
            loading:false
        };        
        case FETCHING_PROJECTS_ERROR:
        return{
            ...state,
            loading: false
        };
        case PROJECT_ADDED:
        return {
            ...state,
            isSaving: false,
            list: [
                ...state.list,
                action.payload                
            ]
        };
        case ADDING_PROJECT:
        return{
            ...state,
            isSaving: true
        };
        case ADDING_PROJECT_ERROR:
        return{
            ...state,
            isSaving: false
        };
        case PROJECT_EDITED:
        return {
            ...state,
            isSaving: false,
            list: [
                action.payload,
                ...state.list                
            ]
        };
        case EDITING_PROJECT:
        return{
            ...state,
            isSaving: true
        };
        case EDITING_PROJECT_ERROR:
        return{
            ...state,
            isSaving: false
        };
        default:
            return state;
    }
};

export default reducer;

