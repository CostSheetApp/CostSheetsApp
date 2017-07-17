import {TOOLS_FETCHED
        ,FETCHING_TOOLS
        ,FETCHING_TOOLS_ERROR

        ,REPORT_FETCHING_TOOL_COST_HISTORY
        ,REPORT_TOOL_COST_HISTORY_FETCHED
        ,REPORT_FETCHING_TOOL_COST_HISTORY_ERROR

        ,REPORT_FETCHING_TOOL_COST_HISTORY_DATA
        ,REPORT_TOOL_COST_HISTORY_FETCHED_DATA
        ,REPORT_FETCHING_TOOL_COST_HISTORY_ERROR_DATA
       } from '../constants/actionTypes';

const initState = {
    listToolEquipment: [],
    listToolEquipmentCostHistory: [],
    listToolEquipmentCostHistoryData: [],
    loadingToolEquipment:false,
    loadingToolEquipmentCostHistory:false
};

const reducer = (state = initState, action) => {
    switch (action.type) {
        case FETCHING_TOOLS:
        return {
            ...state,
            loadingToolEquipment:true
        };
        case TOOLS_FETCHED:
        return {
            ...state,
            listToolEquipment: action.list,
            listToolEquipmentCostHistory: [],
            listToolEquipmentCostHistoryData: [],
            loadingToolEquipment:false
        };
        case FETCHING_TOOLS_ERROR:
        return{
            ...state,
            loadingToolEquipment: false
        };

        case REPORT_FETCHING_TOOL_COST_HISTORY:
        return {
            ...state,
            loadingToolEquipmentCostHistory:true
        };
        case REPORT_TOOL_COST_HISTORY_FETCHED:
        return {
            ...state,
            listToolEquipmentCostHistory: action.list,
            loadingToolEquipmentCostHistory:false
        };
        case REPORT_FETCHING_TOOL_COST_HISTORY_ERROR:
        return{
            ...state,
            loadingToolEquipmentCostHistory: false
        };


        case REPORT_FETCHING_TOOL_COST_HISTORY_DATA:
        return {
            ...state,
            loadingToolEquipmentCostHistory:true
        };
        case REPORT_TOOL_COST_HISTORY_FETCHED_DATA:
        return {
            ...state,
            listToolEquipmentCostHistoryData: action.list,
            loadingToolEquipmentCostHistory:false
        };
        case REPORT_FETCHING_TOOL_COST_HISTORY_ERROR_DATA:
        return{
            ...state,
            loadingToolEquipmentCostHistory: false
        };

        default:
            return state;
    }
};

export default reducer;