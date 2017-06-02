import {
    MATERIALS_FETCHED,
    FETCHING_MATERIALS,
    FETCHING_MATERIALS_ERROR,
    FETCHING_MATERIAL_COST_HISTORY,
    MATERIAL_COST_HISTORY_FETCHED,
    FETCHING_MATERIAL_COST_HISTORY_ERROR,
    MATERIAL_UNITS_OF_MEASUREMENT_FETCHED,
    FETCHING_MATERIAL_UNITS_OF_MEASUREMENT_ERROR,
    MATERIAL_ADDED,
    ADDING_MATERIAL,
    ADDING_MATERIAL_ERROR
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
                    action.payload, ...state.list
                ]
            };
        case ADDING_MATERIAL:
            return {
                ...state,
                isSaving: true
            }
        case ADDING_MATERIAL_ERROR:
            return {
                ...state,
                isSaving: false
            }
        default:
            return state;
    }
};

export default reducer;
