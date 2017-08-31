import { PROJECTS_FETCHED, FETCHING_PROJECTS, FETCHING_PROJECTS_ERROR, ACCOUNT_LOGOUT, PROJECTS_CONSOLIDATE_MATERIAL_FETCHED, FETCHING_PROJECTS_CONSOLIDATE_MATERIAL, FETCHING_PROJECTS_CONSOLIDATE_MATERIAL_ERROR, PROJECTS_CONSOLIDATE_MANPOWER_FETCHED, FETCHING_PROJECTS_CONSOLIDATE_MANPOWER, FETCHING_PROJECTS_CONSOLIDATE_MANPOWER_ERROR, PROJECTS_CONSOLIDATE_TOOLSANDEQUIPMENT_FETCHED, FETCHING_PROJECTS_CONSOLIDATE_TOOLSANDEQUIPMENT, FETCHING_PROJECTS_CONSOLIDATE_TOOLSANDEQUIPMENT_ERROR, SELECT_PROJECT_TO_CONSOLIDATE, FETCHING_PROJECTS_CONSOLIDATE_INDIRECTCOST, PROJECTS_CONSOLIDATE_INDIRECTCOST_FETCHED, FETCHING_PROJECTS_CONSOLIDATE_INDIRECTCOST_ERROR} from '../constants/actionTypes';

const initState = {
    listProject: [],
    listMaterial: [],
    listManPower: [],
    listToolEquipment: [],
    listIndrectCost: [],
    loadingProject: false,
    loadingMaterial: false,
    loadingManPower: false,
    loadingToolEquipment: false,
    loadingIndirectCost: false,

    project: {}
};

const reducer = (state = initState, action) => {
    switch (action.type) {
        case FETCHING_PROJECTS:
            return {
                ...state,
                loadingProject: true
            };
        case PROJECTS_FETCHED:
            return {
                ...state,
                listProject: action.list.filter((o) => !o.isDeleted),
                listMaterial: [],
                listManPower: [],
                listToolEquipment: [],
                listIndrectCost: [],
                project: {},
                loadingProject: false
            };
        case FETCHING_PROJECTS_ERROR:
            return {
                ...state,
                loadingProject: false
            };

        case FETCHING_PROJECTS_CONSOLIDATE_MATERIAL:
            return {
                ...state,
                loadingMaterial: true
            };
        case PROJECTS_CONSOLIDATE_MATERIAL_FETCHED:
            return {
                ...state,
                listMaterial: action.list,
                loadingMaterial: false
            };
        case FETCHING_PROJECTS_CONSOLIDATE_MATERIAL_ERROR:
            return {
                ...state,
                loadingMaterial: false
            };

        case FETCHING_PROJECTS_CONSOLIDATE_MANPOWER:
            return {
                ...state,
                loadingManPower: true
            };
        case PROJECTS_CONSOLIDATE_MANPOWER_FETCHED:
            return {
                ...state,
                listManPower: action.list,
                loadingManPower: false
            };
        case FETCHING_PROJECTS_CONSOLIDATE_MANPOWER_ERROR:
            return {
                ...state,
                loadingManPower: false
            };


        case FETCHING_PROJECTS_CONSOLIDATE_TOOLSANDEQUIPMENT:
            return {
                ...state,
                loadingToolEquipment: true
            };
        case PROJECTS_CONSOLIDATE_TOOLSANDEQUIPMENT_FETCHED:
            return {
                ...state,
                listToolEquipment: action.list,
                loadingToolEquipment: false
            };
        case FETCHING_PROJECTS_CONSOLIDATE_TOOLSANDEQUIPMENT_ERROR:
            return {
                ...state,
                loadingToolEquipment: false
            };
        case SELECT_PROJECT_TO_CONSOLIDATE:
            return {
                ...state,
                project: action.project
            };

        case FETCHING_PROJECTS_CONSOLIDATE_INDIRECTCOST:
            return {
                ...state,
                loadingIndirectCost: true
            };
        case PROJECTS_CONSOLIDATE_INDIRECTCOST_FETCHED:
            return {
                ...state,
                listIndrectCost: action.list,
                loadingIndirectCost: false
            };
        case FETCHING_PROJECTS_CONSOLIDATE_INDIRECTCOST_ERROR:
            return {
                ...state,
                loadingIndirectCost: false
            };
        case ACCOUNT_LOGOUT:
            return initState;
        default:
            return state;
    }
};

export default reducer;