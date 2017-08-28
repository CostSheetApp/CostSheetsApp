import { PROJECTS_FETCHED, ACCOUNT_LOGOUT, FETCHING_PROJECTS, FETCHING_PROJECTS_ERROR, PROJECT_ADDED, ADDING_PROJECT, ADDING_PROJECT_ERROR, PROJECT_EDITED, PROJECT_DELETED, PROJECT_INDIRECT_COSTS_FETCHED, FETCHING_PROJECT_INDIRECT_COSTS_ERROR, PROJECT_NEW_INDIRECT_COST_ADDED,
} from '../constants/actionTypes';

const initState = {
    list: [],
    loading: false,
    isSaving: false,
    IndirectCosts: []
};

const reducer = (state = initState, action) => {
    switch (action.type) {
        case PROJECT_NEW_INDIRECT_COST_ADDED:
            return {
                ...state,
                IndirectCosts: [...state.IndirectCosts, action.payload]
            };
        case PROJECT_INDIRECT_COSTS_FETCHED:
            return {
                ...state,
                IndirectCosts: action.list
            };
        case FETCHING_PROJECT_INDIRECT_COSTS_ERROR:
            return {
                ...state,
                IndirectCosts: []
            };
        case FETCHING_PROJECTS:
            return {
                ...state,
                loading: true
            };
        case PROJECTS_FETCHED:
            return {
                ...state,
                list: action.list,
                loading: false
            };
        case FETCHING_PROJECTS_ERROR:
            return {
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
            return {
                ...state,
                isSaving: true
            };
        case ADDING_PROJECT_ERROR:
            return {
                ...state,
                isSaving: false
            };
        case PROJECT_EDITED:
            return {
                ...state,
                list: state.list.map((item) => {
                    if (item.id !== action.payload.id) {
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
        case ACCOUNT_LOGOUT:
            return initState;
        default:
            return state;
    }
};

export default reducer;

