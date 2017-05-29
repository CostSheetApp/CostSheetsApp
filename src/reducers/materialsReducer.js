import {MATERIALS_FETCHED,FETCHING_MATERIALS,FETCHING_MATERIALS_ERROR,FETCHING_MATERIAL_COST_HISTORY,MATERIAL_COST_HISTORY_FETCHED,FETCHING_MATERIAL_COST_HISTORY_ERROR} from '../constants/actionTypes';

const initState = {
    list: [],
    loading:false,
    CostHistory: {
        list: [],
        loading: false
    },
    isSaving: false
};

const reducer = (state = initState, action) => {
    switch (action.type) {
        case FETCHING_MATERIALS:
        return {
            ...state,
            loading:true
        };
        case MATERIALS_FETCHED:
        return {
            ...state,
            list: action.list,
            loading:false
        };        
        case FETCHING_MATERIALS_ERROR:
        return{
            ...state,
            loading: false
        };
        case FETCHING_MATERIAL_COST_HISTORY:
        return {
            ...state,
            CostHistory: {
                ...state.CostHistory,
                list: [],
                loading: true
            }
        };        
        case MATERIAL_COST_HISTORY_FETCHED:
        return {
            ...state,
            CostHistory: {
                ...state.CostHistory,
                list: action.list,
                loading: false
            }
        }; 
        case FETCHING_MATERIAL_COST_HISTORY_ERROR:
        return {
            ...state,
            CostHistory: {
                ...state.CostHistory,
                list: [],
                loading: false
            }
        }; 
        default:
            return state;
    }
};

export default reducer;

