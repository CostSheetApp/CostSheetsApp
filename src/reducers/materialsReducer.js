import {MATERIALS_FETCHED,FETCHING_MATERIALS,FETCHING_MATERIALS_ERROR} from '../constants/actionTypes';

const initState = {
    list: [],
    loading:false,
    materialToEdit: {},
    materialCostHistory: [],
    isSaving: false
}

const reducer = (state = initState, action) => {
    switch (action.type) {
        case MATERIALS_FETCHED:
        return {
            ...state,
            list: action.list,
            loading:false
        }
        case FETCHING_MATERIALS:
        return {
            ...state,
            loading:true
        }
        case FETCHING_MATERIALS_ERROR:
        return{
            ...state,
            loading: false
        }
        default:
            return state
    }
}

export default reducer

