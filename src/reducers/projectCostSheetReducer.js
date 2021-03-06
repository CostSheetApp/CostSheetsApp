import { PROJECTS_COSTSHEET_FETCHED, FETCHING_PROJECTS_COSTSHEET, FETCHING_PROJECTS_COSTSHEET_ERROR, PROJECTS_COSTSHEET_ADDED, ACCOUNT_LOGOUT} from '../constants/actionTypes';

const initState = {
    list: [],
    loading: false,
    toEdit: {}
};

const reducer = (state = initState, action) => {
    switch (action.type) {
        case PROJECTS_COSTSHEET_ADDED:
            return {
                ...state,
                list: [...state.list, action.payload]
            };
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
        case ACCOUNT_LOGOUT:
            return initState;
        default:
            return state;
    }
};

export default reducer;
