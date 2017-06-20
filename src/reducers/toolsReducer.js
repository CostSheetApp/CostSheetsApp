import {
    TOOLS_FETCHED,
    FETCHING_TOOLS,
    FETCHING_TOOLS_ERROR,
    FETCHING_TOOL_COST_HISTORY,
    TOOL_COST_HISTORY_FETCHED,
    TOOL_COST_HISTORY_FETCHED_ADD,
    FETCHING_TOOL_COST_HISTORY_ERROR,
    TOOL_ADDED,
    ADDING_TOOL,
    ADDING_TOOL_ERROR,
    TOOL_UPDATED,
    TOOL_DELETED
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
        case TOOL_COST_HISTORY_FETCHED_ADD:
            return {
                ...state,
                CostHistory: {
                    ...state.CostHistory,
                    list: [action.payload,state.CostHistory.list],
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
        case TOOL_UPDATED:
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
        case ADDING_TOOL_ERROR:
            return {
                ...state,
                isSaving: false
            };
        case TOOL_DELETED:
        return {
            ...state,
            list: state.list.filter((item) => item.id !== action.id)
        };
        default:
            return state;
    }
};

export default reducer;