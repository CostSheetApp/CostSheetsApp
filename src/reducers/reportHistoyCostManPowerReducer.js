import {MANPOWERS_FETCHED
        ,FETCHING_MANPOWERS
        ,FETCHING_MANPOWERS_ERROR

        ,REPORT_FETCHING_MANPOWER_COST_HISTORY
        ,REPORT_MANPOWER_COST_HISTORY_FETCHED
        ,REPORT_FETCHING_MANPOWER_COST_HISTORY_ERROR

        ,REPORT_FETCHING_MANPOWER_COST_HISTORY_DATA
        ,REPORT_MANPOWER_COST_HISTORY_FETCHED_DATA
        ,REPORT_FETCHING_MANPOWER_COST_HISTORY_ERROR_DATA
       } from '../constants/actionTypes';

const initState = {
    listManPower: [],
    listManPowerCostHistory: [],
    listManPowerCostHistoryData: [],
    loadingManPower:false,
    loadingManPowerCostHistory:false
};

const reducer = (state = initState, action) => {
    switch (action.type) {
        case FETCHING_MANPOWERS:
        return {
            ...state,
            loadingManPower:true
        };
        case MANPOWERS_FETCHED:
        return {
            ...state,
            listManPower: action.list,
            listManPowerCostHistory: [],
            listManPowerCostHistoryData: [],
            loadingManPower:false
        };
        case FETCHING_MANPOWERS_ERROR:
        return{
            ...state,
            loadingManPower: false
        };

        case REPORT_FETCHING_MANPOWER_COST_HISTORY:
        return {
            ...state,
            loadingManPowerCostHistory:true
        };
        case REPORT_MANPOWER_COST_HISTORY_FETCHED:
        return {
            ...state,
            listManPowerCostHistory: action.list,
            loadingManPowerCostHistory:false
        };
        case REPORT_FETCHING_MANPOWER_COST_HISTORY_ERROR:
        return{
            ...state,
            loadingManPowerCostHistory: false
        };

        case REPORT_FETCHING_MANPOWER_COST_HISTORY_DATA:
        return {
            ...state,
            loadingManPowerCostHistory:true
        };
        case REPORT_MANPOWER_COST_HISTORY_FETCHED_DATA:
        return {
            ...state,
            listManPowerCostHistoryData: action.list,
            loadingManPowerCostHistory:false
        };
        case REPORT_FETCHING_MANPOWER_COST_HISTORY_ERROR_DATA:
        return{
            ...state,
            loadingManPowerCostHistory: false
        };

        default:
            return state;
    }
};

export default reducer;