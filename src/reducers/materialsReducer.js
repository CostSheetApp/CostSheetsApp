import {
    MATERIALS_FETCHED,
    FETCHING_MATERIALS,
    FETCHING_MATERIALS_ERROR,
    FETCHING_MATERIAL_COST_HISTORY,
    MATERIAL_COST_HISTORY_FETCHED,
    MATERIAL_COST_HISTORY_FETCHED_ADD,
    FETCHING_MATERIAL_COST_HISTORY_ERROR,
    MATERIAL_UNITS_OF_MEASUREMENT_FETCHED,
    //FETCHING_MATERIAL_UNITS_OF_MEASUREMENT_ERROR,
    MATERIAL_ADDED,
    ADDING_MATERIAL,
    ADDING_MATERIAL_ERROR,
    MATERIAL_UPDATED,
    MATERIAL_DELETED
} from '../constants/actionTypes';

const initState = {
    list: [],
    loading: false,
    CostHistory: {
        list: [],
        loading: false
    },
    UnitsOfMeasurement: [],
    isSaving: false
};

const reducer = (state = initState, action) => {
    switch (action.type) {
        case FETCHING_MATERIALS:
            return {
                ...state,
                loading: true
            };
        case MATERIALS_FETCHED:
            return {
                ...state,
                list: action.list,
                loading: false
            };
        case FETCHING_MATERIALS_ERROR:
            return {
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
        case MATERIAL_COST_HISTORY_FETCHED_ADD:
            return {
                ...state,
                CostHistory: {
                    ...state.CostHistory,
                    list: [action.payload,state.CostHistory.list],
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
        case MATERIAL_UNITS_OF_MEASUREMENT_FETCHED:
            return {
                ...state,
                UnitsOfMeasurement: action.payload
            };
        case MATERIAL_ADDED:
            return {
                ...state,
                isSaving: false,
                list: [
                     ...state.list,action.payload
                ]
            };
        case ADDING_MATERIAL:
            return {
                ...state,
                isSaving: true
            };
        case ADDING_MATERIAL_ERROR:
            return {
                ...state,
                isSaving: false
            };
        case MATERIAL_UPDATED:
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
        case MATERIAL_DELETED:
        return {
            ...state,
            list: state.list.filter((item) => item.id !== action.id)
        };
        default:
            return state;
    }
};

export default reducer;
