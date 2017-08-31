import { USER_ADDED, ADDING_USER, ACCOUNT_LOGOUT, ADDING_USER_ERROR, USER_EDITED, USERS_FETCHED, FETCHING_USERS, FETCHING_USERS_ERROR, USER_DELETED } from '../constants/actionTypes';

const initState = {
    list: [],
    loading: false,
    isSaving: false
};

const reducer = (state = initState, action) => {
    switch (action.type) {
        case FETCHING_USERS:
            return {
                ...state,
                loading: true
            };
        case USERS_FETCHED:
            return {
                ...state,
                list: action.list.filter((o) => !o.isDeleted),
                loading: false
            };
        case FETCHING_USERS_ERROR:
            return {
                ...state,
                loading: false
            };
        case USER_ADDED:
            return {
                ...state,
                isSaving: false,
                list: [
                    ...state.list,
                    action.payload
                ]
            };
        case ADDING_USER:
            return {
                ...state,
                isSaving: true
            };
        case ADDING_USER_ERROR:
            return {
                ...state,
                isSaving: false
            };
        case USER_EDITED:
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
        case USER_DELETED:
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

