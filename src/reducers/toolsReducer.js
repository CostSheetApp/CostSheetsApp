import {
    TOOLS_FETCHED,
    FETCHING_TOOLS,
    FETCHING_TOOLS_ERROR,
    FETCHING_TOOL_COST_HISTORY,
    TOOL_COST_HISTORY_FETCHED,
    FETCHING_TOOL_COST_HISTORY_ERROR,
    TOOL_ADDED,
    ADDING_TOOL,
    ADDING_TOOL_ERROR
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
        case FETCHING_TOOLS:
            return {
                ...state,
                loading: true
            };
        case TOOLS_FETCHED:
            return {
                ...state,
                list: action.list,
                loading: false
            };
        case FETCHING_TOOLS_ERROR:
            return {
                ...state,
                loading: false
            };
        case FETCHING_TOOL_COST_HISTORY:
            return {
                ...state,
                CostHistory: {
                    ...state.CostHistory,
                    list: [],
                    loading: true
                }
            };
        case TOOL_COST_HISTORY_FETCHED:
            return {
                ...state,
                CostHistory: {
                    ...state.CostHistory,
                    list: action.list,
                    loading: false
                }
            };
        case FETCHING_TOOL_COST_HISTORY_ERROR:
            return {
                ...state,
                CostHistory: {
                    ...state.CostHistory,
                    list: [],
                    loading: false
                }
            };
        case TOOL_ADDED:
            return {
                ...state,
                isSaving: false,
                list: [
                    ...state.list,
                    action.payload
                ]
            };
        case ADDING_TOOL:
            return {
                ...state,
                isSaving: true
            };
        case ADDING_TOOL_ERROR:
            return {
                ...state,
                isSaving: false
            };
        default:
            return state;
    }
};

export default reducer;