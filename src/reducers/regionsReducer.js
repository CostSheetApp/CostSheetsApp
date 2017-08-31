import { REGIONS_FETCHED, ACCOUNT_LOGOUT, FETCHING_REGIONS, FETCHING_REGIONS_ERROR, REGION_ADDED, ADDING_REGION, ADDING_REGION_ERROR, REGION_EDITED, TOOL_DELETED } from '../constants/actionTypes';

const initState = {
    list: [],
    loading: false,
    isSaving: false
};

const reducer = (state = initState, action) => {
    switch (action.type) {
        case FETCHING_REGIONS:
            return {
                ...state,
                loading: true
            };
        case REGIONS_FETCHED:
            return {
                ...state,
                list: action.list.filter((o) => !o.isDeleted),
                loading: false
            };
        case FETCHING_REGIONS_ERROR:
            return {
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
            return {
                ...state,
                isSaving: true
            };
        case ADDING_REGION_ERROR:
            return {
                ...state,
                isSaving: false
            };
        case REGION_EDITED:
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
        case TOOL_DELETED:
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

