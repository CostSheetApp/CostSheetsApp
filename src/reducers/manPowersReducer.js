import {
    MANPOWERS_FETCHED,
    FETCHING_MANPOWERS,
    FETCHING_MANPOWERS_ERROR,
    FETCHING_MANPOWER_COST_HISTORY,
    MANPOWER_COST_HISTORY_FETCHED,
    FETCHING_MANPOWER_COST_HISTORY_ERROR,
    MANPOWER_ADDED,
    ADDING_MANPOWER,
    ADDING_MANPOWER_ERROR
} from '../constants/actionTypes';

const initState = {
    list: [],
    loading: false,
    CostHistory: {
        list: [],
        loading: false
    },
    isSaving: false
};

const reducer = (state = initState, action) => {
    switch (action.type) {
        case FETCHING_MANPOWERS:
            return {
                ...state,
                loading: true
            };
        case MANPOWERS_FETCHED:
            return {
                ...state,
                list: action.list,
                loading: false
            };
        case FETCHING_MANPOWERS_ERROR:
            return {
                ...state,
                loading: false
            };
        case FETCHING_MANPOWER_COST_HISTORY:
            return {
                ...state,
                CostHistory: {
                    ...state.CostHistory,
                    list: [],
                    loading: true
                }
            };
        case MANPOWER_COST_HISTORY_FETCHED:
            return {
                ...state,
                CostHistory: {
                    ...state.CostHistory,
                    list: action.list,
                    loading: false
                }
            };
        case FETCHING_MANPOWER_COST_HISTORY_ERROR:
            return {
                ...state,
                CostHistory: {
                    ...state.CostHistory,
                    list: [],
                    loading: false
                }
            };
        case MANPOWER_ADDED:
            return {
                ...state,
                isSaving: false,
                list: [
                    action.payload, ...state.list
                ]
            };
        case ADDING_MANPOWER:
            return {
                ...state,
                isSaving: true
            }
        case ADDING_MANPOWER_ERROR:
            return {
                ...state,
                isSaving: false
            }
        default:
            return state;
    }
};

export default reducer;