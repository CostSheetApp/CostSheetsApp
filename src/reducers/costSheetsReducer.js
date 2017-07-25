import {
    //COST_SHEET_ADDED,
    COST_SHEETS_FETCHED,
    COST_SHEET_FETCHED,
    COST_SHEET_MATERIALS_FETCHED,
    //FETCHED_COST_SHEET_MATERIALS_ERROR,
    COST_SHEET_MANPOWER_FETCHED,
    COST_SHEET_TOOLS_AND_EQUIPMENT_FETCHED,
    SELECT_MATERIAL_TO_BE_ADD_TO_COSTSHEET,

    SUM_COST_SHEET_MATERIALS_FETCHED,
    SUM_COST_SHEET_MANPOWER_FETCHED,
    SUM_COST_SHEET_TOOLS_AND_EQUIPMENT_FETCHED
} from '../constants/actionTypes';

const initState = {
    list: [],
    toEdit: {},
    materialsToEdit: [],
    materialToBeAddToCostSheet: {},
    manpowersToEdit: [],
    manpowerToBeAddToCostSheet: {},
    toolsAndEquipmentsToEdit: [],
    toolsAndEquipmentToBeAddToCostSheet: {},
    materialSelect: {},
    SumMaterial: [],
    SumManPower: [],
    SumToolAndEquipment: []
};

const reducer = (state = initState, action) => {
    switch (action.type) {
        case COST_SHEETS_FETCHED:
            return {
                ...state,
                list: action.payload,
                materialsToEdit: [],
                materialToBeAddToCostSheet: {},
                manpowersToEdit: [],
                manpowerToBeAddToCostSheet: {},
                toolsAndEquipmentsToEdit: [],
                toolsAndEquipmentToBeAddToCostSheet: {},
                materialSelect: {},
                SumMaterial: [],
                SumManPower: [],
                SumToolAndEquipment: []
            };
        case COST_SHEET_FETCHED:
            return {
                ...state,
                toEdit: action.payload
            };
        case COST_SHEET_MATERIALS_FETCHED:
            return {
                ...state,
                materialsToEdit:action.payload
            };
        case COST_SHEET_MANPOWER_FETCHED:
            return {
                ...state,
                manpowersToEdit:action.payload
            };
        case COST_SHEET_TOOLS_AND_EQUIPMENT_FETCHED:
            return {
                ...state,
                toolsAndEquipmentsToEdit:action.payload
            };
        case SELECT_MATERIAL_TO_BE_ADD_TO_COSTSHEET:
        return {
            ...state,
            materialToBeAddToCostSheet: action.material
        };
        case SUM_COST_SHEET_MATERIALS_FETCHED:
        return {
            ...state,
            SumMaterial: action.payload
        };
        case SUM_COST_SHEET_MANPOWER_FETCHED:
        return {
            ...state,
            SumManPower: action.payload
        };
        case SUM_COST_SHEET_TOOLS_AND_EQUIPMENT_FETCHED:
        return {
            ...state,
            SumToolAndEquipment: action.payload
        };
        default:
            return state;
    }
};

export default reducer;
