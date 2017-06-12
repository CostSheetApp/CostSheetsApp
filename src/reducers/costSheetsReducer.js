import {
    COST_SHEET_ADDED,
    COST_SHEETS_FETCHED,
    COST_SHEET_FETCHED,
    COST_SHEET_MATERIALS_FETCHED,
    FETCHED_COST_SHEET_MATERIALS_ERROR,
    COST_SHEET_MANPOWER_FETCHED,
    COST_SHEET_TOOLS_AND_EQUIPMENT_FETCHED
} from '../constants/actionTypes';

const initState = {
    list: [],
    toEdit: {},
    materialsToEdit: [],
    manpowersToEdit: [],
    toolsAndEquipmentsToEdit: []
};

const reducer = (state = initState, action) => {
    switch (action.type) {
        case COST_SHEETS_FETCHED:
            return {
                ...state,
                list: action.payload
            };
        case COST_SHEET_FETCHED:
            return {
                ...state,
                toEdit: action.payload
            }
        case COST_SHEET_MATERIALS_FETCHED:
            return {
                ...state,
                materialsToEdit:action.payload
            }
        case COST_SHEET_MANPOWER_FETCHED:
            return {
                ...state,
                manpowersToEdit:action.payload
            }
        case COST_SHEET_TOOLS_AND_EQUIPMENT_FETCHED:
            return {
                ...state,
                toolsAndEquipmentsToEdit:action.payload
            }
        default:
            return state;
    }
};

export default reducer;
