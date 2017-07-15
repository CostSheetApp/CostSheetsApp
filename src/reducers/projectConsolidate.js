import {PROJECTS_FETCHED
        ,FETCHING_PROJECTS
        ,FETCHING_PROJECTS_ERROR

        ,PROJECTS_CONSOLIDATE_MATERIAL_FETCHED
        ,FETCHING_PROJECTS_CONSOLIDATE_MATERIAL
        ,FETCHING_PROJECTS_CONSOLIDATE_MATERIAL_ERROR

        ,PROJECTS_CONSOLIDATE_MANPOWER_FETCHED
        ,FETCHING_PROJECTS_CONSOLIDATE_MANPOWER
        ,FETCHING_PROJECTS_CONSOLIDATE_MANPOWER_ERROR

        ,PROJECTS_CONSOLIDATE_TOOLSANDEQUIPMENT_FETCHED
        ,FETCHING_PROJECTS_CONSOLIDATE_TOOLSANDEQUIPMENT
        ,FETCHING_PROJECTS_CONSOLIDATE_TOOLSANDEQUIPMENT_ERROR
       } from '../constants/actionTypes';

const initState = {
    listProject: [],
    listMaterial: [],
    listManPower: [],
    listToolEquipment: [],
    loadingProject:false,
    loadingMaterial:false,
    loadingManPower:false,
    loadingToolEquipment:false
};

const reducer = (state = initState, action) => {
    switch (action.type) {
        case FETCHING_PROJECTS:
        return {
            ...state,
            loadingProject:true
        };
        case PROJECTS_FETCHED:
        return {
            ...state,
            listProject: action.list,
            listMaterial: [],
            listManPower: [],
            listToolEquipment: [],
            loadingProject:false
        };
        case FETCHING_PROJECTS_ERROR:
        return{
            ...state,
            loadingProject: false
        };

        case FETCHING_PROJECTS_CONSOLIDATE_MATERIAL:
        return {
            ...state,
            loadingMaterial:true
        };
        case PROJECTS_CONSOLIDATE_MATERIAL_FETCHED:
        return {
            ...state,
            listMaterial: action.list,
            loadingMaterial:false
        };
        case FETCHING_PROJECTS_CONSOLIDATE_MATERIAL_ERROR:
        return{
            ...state,
            loadingMaterial: false
        };

        case FETCHING_PROJECTS_CONSOLIDATE_MANPOWER:
        return {
            ...state,
            loadingManPower:true
        };
        case PROJECTS_CONSOLIDATE_MANPOWER_FETCHED:
        return {
            ...state,
            listManPower: action.list,
            loadingManPower:false
        };
        case FETCHING_PROJECTS_CONSOLIDATE_MANPOWER_ERROR:
        return{
            ...state,
            loadingManPower: false
        };


        case FETCHING_PROJECTS_CONSOLIDATE_TOOLSANDEQUIPMENT:
        return {
            ...state,
            loadingToolEquipment:true
        };
        case PROJECTS_CONSOLIDATE_TOOLSANDEQUIPMENT_FETCHED:
        return {
            ...state,
            listToolEquipment: action.list,
            loadingToolEquipment:false
        };
        case FETCHING_PROJECTS_CONSOLIDATE_TOOLSANDEQUIPMENT_ERROR:
        return{
            ...state,
            loadingToolEquipment: false
        };

        default:
            return state;
    }
};

export default reducer;