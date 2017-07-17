import axios from 'axios';
import cookie from 'react-cookie';
import {API_URL} from '../constants/global';
import {MATERIALS_FETCHED
        ,FETCHING_MATERIALS
        ,FETCHING_MATERIALS_ERROR

        ,TOOLS_FETCHED
        ,FETCHING_TOOLS
        ,FETCHING_TOOLS_ERROR

        ,MANPOWERS_FETCHED
        ,FETCHING_MANPOWERS
        ,FETCHING_MANPOWERS_ERROR

        ,REPORT_MATERIAL_COST_HISTORY_FETCHED
        ,REPORT_FETCHING_MATERIAL_COST_HISTORY
        ,REPORT_FETCHING_MATERIAL_COST_HISTORY_ERROR

        ,REPORT_MATERIAL_COST_HISTORY_FETCHED_DATA
        ,REPORT_FETCHING_MATERIAL_COST_HISTORY_DATA
        ,REPORT_FETCHING_MATERIAL_COST_HISTORY_ERROR_DATA

        ,REPORT_FETCHING_MANPOWER_COST_HISTORY
        ,REPORT_MANPOWER_COST_HISTORY_FETCHED
        ,REPORT_FETCHING_MANPOWER_COST_HISTORY_ERROR

        ,REPORT_FETCHING_MANPOWER_COST_HISTORY_DATA
        ,REPORT_MANPOWER_COST_HISTORY_FETCHED_DATA
        ,REPORT_FETCHING_MANPOWER_COST_HISTORY_ERROR_DATA

        ,REPORT_FETCHING_TOOL_COST_HISTORY
        ,REPORT_TOOL_COST_HISTORY_FETCHED
        ,REPORT_FETCHING_TOOL_COST_HISTORY_ERROR

        ,REPORT_FETCHING_TOOL_COST_HISTORY_DATA
        ,REPORT_TOOL_COST_HISTORY_FETCHED_DATA
        ,REPORT_FETCHING_TOOL_COST_HISTORY_ERROR_DATA
       } from '../constants/actionTypes';

export const FetchMaterials = (entityId) => (dispatch) => {
    dispatch({type: FETCHING_MATERIALS});

    axios
        .get(`${API_URL}/Entities/${entityId}/materials?filter={"where": {"isDeleted": false },"include":"unitsOfMeasurement"}`, {
        headers: {'Authorization': cookie.load('token')}
    })
        .then((response) => {
            dispatch({type: MATERIALS_FETCHED, list: response.data});
        })
        .catch((error) => {
            
            dispatch({
                type: FETCHING_MATERIALS_ERROR,
                error: error.response.data.error.message
            });
            //errorHandler(dispatch, error.response, FETCHING_APPOITMENTS_ERROR)
        });
};

export const FetchTools = (entityId) => (dispatch) => {
    dispatch({type: FETCHING_TOOLS});

    axios
        .get(`${API_URL}/Entities/${entityId}/toolsAndEquipments?filter={"where": {"isDeleted": false }}`, {
        headers: {'Authorization': cookie.load('token')}
    })
        .then((response) => {
            dispatch({type: TOOLS_FETCHED, list: response.data});
        })
        .catch((error) => {
            dispatch({
                type: FETCHING_TOOLS_ERROR,
                error: error.response.data.error.message
            });
        });
};

export const FetchManPowers = (entityId) => (dispatch) => {
    dispatch({type: FETCHING_MANPOWERS});

    axios
        .get(`${API_URL}/Entities/${entityId}/manpowers?filter={"where": {"isDeleted": false },"include":"job"}`, {
        headers: {'Authorization': cookie.load('token')}
    })
        .then((response) => {
            dispatch({type: MANPOWERS_FETCHED, list: response.data});
        })
        .catch((error) => {
            dispatch({
                type: FETCHING_MANPOWERS_ERROR,
                error: error.response.data.error.message
            });
        });
};

export const ReportCostHistoryMaterial = (materialId) =>
    (dispatch) => {
        //dispatch({type: REPORT_FETCHING_MATERIAL_COST_HISTORY});

        axios
            .get(`${API_URL}/Materials/${materialId}/CostHistory`,{
        headers: {'Authorization': cookie.load('token')}
        })
            .then((response) => {
                dispatch({type: REPORT_MATERIAL_COST_HISTORY_FETCHED, list: response.data.data });
            })
            .catch((error) => {
                console.log(error);
                dispatch({
                    type: REPORT_FETCHING_MATERIAL_COST_HISTORY_ERROR,
                    error: error.response.data.error.message
                });
                //errorHandler(dispatch, error.response, FETCHING_APPOITMENTS_ERROR)
            });
    };

export const ReportCostHistoryMaterialData = (materialId) =>
    (dispatch) => {
        //dispatch({type: REPORT_FETCHING_MATERIAL_COST_HISTORY_DATA});

        axios
            .get(`${API_URL}/Materials/${materialId}/CostHistoryData`,{
        headers: {'Authorization': cookie.load('token')}
        })
            .then((response) => {
                dispatch({type: REPORT_MATERIAL_COST_HISTORY_FETCHED_DATA, list: response.data.data });
            })
            .catch((error) => {
                console.log(error);
                dispatch({
                    type: REPORT_FETCHING_MATERIAL_COST_HISTORY_ERROR_DATA,
                    error: error.response.data.error.message
                });
                //errorHandler(dispatch, error.response, FETCHING_APPOITMENTS_ERROR)
            });
    };


export const ReportCostHistoryManPower = (manPowerId) =>
    (dispatch) => {
        dispatch({type: REPORT_FETCHING_MANPOWER_COST_HISTORY});

        axios
            .get(`${API_URL}/Manpowers/${manPowerId}/CostHistory`,{
        headers: {'Authorization': cookie.load('token')}
        })
            .then((response) => {
                dispatch({type: REPORT_MANPOWER_COST_HISTORY_FETCHED, list: (response.data) ? response.data.data : [] });
            })
            .catch((error) => {
                console.log(error);
                dispatch({
                    type: REPORT_FETCHING_MANPOWER_COST_HISTORY_ERROR,
                    error: error.response.data.error.message
                });
                //errorHandler(dispatch, error.response, FETCHING_APPOITMENTS_ERROR)
            });
    };

export const ReportCostHistoryManPowerData = (manPowerId) =>
    (dispatch) => {
        dispatch({type: REPORT_FETCHING_MANPOWER_COST_HISTORY_DATA});

        axios
            .get(`${API_URL}/Manpowers/${manPowerId}/CostHistoryData`,{
        headers: {'Authorization': cookie.load('token')}
        })
            .then((response) => {
                dispatch({type: REPORT_MANPOWER_COST_HISTORY_FETCHED_DATA, list: (response.data) ? response.data.data : [] });
            })
            .catch((error) => {
                //console.log(error);
                dispatch({
                    type: REPORT_FETCHING_MANPOWER_COST_HISTORY_ERROR_DATA,
                    error: error.response.data.error.message
                });
                //errorHandler(dispatch, error.response, FETCHING_APPOITMENTS_ERROR)
            });
    };


export const ReportCostHistorToolsAndEquipment = (toolsAndEquipmentId) =>
    (dispatch) => {
        dispatch({type: REPORT_FETCHING_TOOL_COST_HISTORY});

        axios
            .get(`${API_URL}/ToolsAndEquipments/${toolsAndEquipmentId}/CostHistory`,{
        headers: {'Authorization': cookie.load('token')}
        })
            .then((response) => {
                dispatch({type: REPORT_TOOL_COST_HISTORY_FETCHED, list: (response.data) ? response.data.data : [] });
            })
            .catch((error) => {
                console.log(error);
                dispatch({
                    type: REPORT_FETCHING_TOOL_COST_HISTORY_ERROR,
                    error: error.response.data.error.message
                });
                //errorHandler(dispatch, error.response, FETCHING_APPOITMENTS_ERROR)
            });
    };

export const ReportCostHistorToolsAndEquipmentData = (toolsAndEquipmentId) =>
    (dispatch) => {
        dispatch({type: REPORT_FETCHING_TOOL_COST_HISTORY_DATA});

        axios
            .get(`${API_URL}/ToolsAndEquipments/${toolsAndEquipmentId}/CostHistoryData`,{
        headers: {'Authorization': cookie.load('token')}
        })
            .then((response) => {
                dispatch({type: REPORT_TOOL_COST_HISTORY_FETCHED_DATA, list: (response.data) ? response.data.data : [] });
            })
            .catch((error) => {
                //console.log(error);
                dispatch({
                    type: REPORT_FETCHING_TOOL_COST_HISTORY_ERROR_DATA,
                    error: error.response.data.error.message
                });
                //errorHandler(dispatch, error.response, FETCHING_APPOITMENTS_ERROR)
            });
    };
