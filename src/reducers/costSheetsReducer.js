import {COST_SHEET_ADDED} from '../constants/actionTypes';

const initState = {
    list: [],
    toEdit:{
        materials:{
            list:[],
            isLoading: false
        },
        manpower:{
            list:[],
            isLoading: false
        },
        toolsAndEquipment:{
            list:[],
            isLoading: false
        }
    }
    
}

const reducer = (state = initState, action) => {
    switch (action.type) {
        case COST_SHEET_ADDED:
        return {
            ...state,
            toEdit: {
                ...action.payload    
            }         
        };
        default:
            return state;
    }
}

export default reducer;
