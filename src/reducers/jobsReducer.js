import { JOB_ADDED, ADDING_JOB, ADDING_JOB_ERROR, JOB_EDITED, JOBS_FETCHED, FETCHING_JOBS, FETCHING_JOBS_ERROR, JOB_DELETED, ACCOUNT_LOGOUT} from '../constants/actionTypes';

const initState = {
    list: [],
    loading: false,
    isSaving: false
};

const reducer = (state = initState, action) => {
    switch (action.type) {
        case FETCHING_JOBS:
            return {
                ...state,
                loading: true
            };
        case JOBS_FETCHED:
            return {
                ...state,
                list: action.list,
                loading: false
            };
        case FETCHING_JOBS_ERROR:
            return {
                ...state,
                loading: false
            };
        case JOB_ADDED:
            return {
                ...state,
                isSaving: false,
                list: [
                    ...state.list,
                    action.payload
                ]
            };
        case ADDING_JOB:
            return {
                ...state,
                isSaving: true
            };
        case ADDING_JOB_ERROR:
            return {
                ...state,
                isSaving: false
            };
        case JOB_EDITED:
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
        case JOB_DELETED:
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

