import {REGIONS_FETCHED,FETCHING_REGIONS,FETCHING_REGIONS_ERROR,REGION_ADDED,ADDING_REGION,ADDING_REGION_ERROR,REGION_EDITED,EDITING_REGION,EDITING_REGION_ERROR} from '../constants/actionTypes';

const initState = {
    list: [],
    loading:false,
    isSaving: false
};

const reducer = (state = initState, action) => {
    switch (action.type) {
        case FETCHING_REGIONS:
        return {
            ...state,
            loading:true
        };
        case REGIONS_FETCHED:
        return {
            ...state,
            list: action.list,
            loading:false
        };        
        case FETCHING_REGIONS_ERROR:
        return{
            ...state,
            loading: false
        };
        case REGION_ADDED:
        return {
            ...state,
            isSaving: false,
            list: [
                ...state.list,
                action.payload                
            ]
        };
        case ADDING_REGION:
        return{
            ...state,
            isSaving: true
        };
        case ADDING_REGION_ERROR:
        return{
            ...state,
            isSaving: false
        };
        case REGION_EDITED:
        return {
            ...state,
            isSaving: false,
            list: [
                action.payload,
                ...state.list                
            ]
        };
        case EDITING_REGION:
        return{
            ...state,
            isSaving: true
        };
        case EDITING_REGION_ERROR:
        return{
            ...state,
            isSaving: false
        };
        default:
            return state;
    }
};

export default reducer;

