import {
    PROJECTS_COSTSHEET_FETCHED,
    FETCHING_PROJECTS_COSTSHEET,
    FETCHING_PROJECTS_COSTSHEET_ERROR
} from '../constants/actionTypes';

const initState = {
    list: [],
    loading: false,
    toEdit: {}
};

const reducer = (state = initState, action) => {
    switch (action.type) {
        case FETCHING_PROJECTS_COSTSHEET:
            return {
                ...state,
                loading: true
            };
        case PROJECTS_COSTSHEET_FETCHED:
            return {
                ...state,
                list: action.list
            };
        case FETCHING_PROJECTS_COSTSHEET_ERROR:
            return {
                ...state,
                loading: false
            };
        default:
            return state;
    }
};

export default reducer;
