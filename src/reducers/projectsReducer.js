import {PROJECTS_FETCHED,FETCHING_PROJECTS,FETCHING_PROJECTS_ERROR,PROJECT_ADDED,ADDING_PROJECT,ADDING_PROJECT_ERROR,PROJECT_EDITED,PROJECT_DELETED} from '../constants/actionTypes';

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
            list: state.list.map( (item) => {
                if(item.id !== action.payload.id) {
                    // This isn't the item we care about - keep it as-is
                    return item;
                }

                // Otherwise, this is the one we want - return an updated value
                return {
                    ...item,
                    ...action.payload
                };    
            })
        };
        case PROJECT_DELETED:
        return {
            ...state,
            list: state.list.filter((item) => item.id !== action.id)
        };
        default:
            return state;
    }
};

export default reducer;

