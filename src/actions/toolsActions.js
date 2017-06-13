import axios from 'axios';
import cookie from 'react-cookie';
import {API_URL} from '../constants/global';
import {
    TOOLS_FETCHED,
    FETCHING_TOOLS,
    FETCHING_TOOLS_ERROR,
    FETCHING_TOOL_COST_HISTORY,
    TOOL_COST_HISTORY_FETCHED,
    FETCHING_TOOL_COST_HISTORY_ERROR,
    TOOL_ADDED,
    ADDING_TOOL,
    ADDING_TOOL_ERROR,
    TOOL_UPDATED,
    UPDATING_TOOL_ERROR,
    TOOL_DELETED,
    DELETING_TOOL_ERROR
} from '../constants/actionTypes';

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

export const FetchToolCostHistory = (id) => (dispatch) => {
    dispatch({type: FETCHING_TOOL_COST_HISTORY});

    axios
        .get(`${API_URL}/ToolsAndEquipments/${id}/toolsAndEquipmentCostHistories?filter={"include":"region"}`, {
        headers: {'Authorization': cookie.load('token')}
    })
        .then((response) => {
            dispatch({type: TOOL_COST_HISTORY_FETCHED, list: response.data});
        })
        .catch((error) => {
            dispatch({
                type: FETCHING_TOOL_COST_HISTORY_ERROR,
                error: error.response.data.error.message
            });
        });
};

export const AddTool = (entityId,params) =>
    (dispatch) => {
        dispatch({type: ADDING_TOOL});
        //params.code = 1;
        //console.log(params);
        axios
        .post(`${API_URL}/Entities/${entityId}/toolsAndEquipments/`,params, {
        headers: {'Authorization': cookie.load('token')}
        })
        .then((response) => {

            axios
            .get(`${API_URL}/ToolsAndEquipments/${response.data.id}`, {
            headers: {'Authorization': cookie.load('token')}
            })
            .then((response) => {
                dispatch({type: TOOL_ADDED, payload: response.data});
            })
            .catch((error) => {
                dispatch({
                    type: ADDING_TOOL_ERROR,
                    error: error.response.data.error.message
                });
                //errorHandler(dispatch, error.response, FETCHING_APPOITMENTS_ERROR)
            });
        })
        .catch((error) => {
            dispatch({
                type: ADDING_TOOL_ERROR,
                error: error.response.data.error.message
            });
            //errorHandler(dispatch, error.response, FETCHING_APPOITMENTS_ERROR)
        });
    };

export const UpdateTool = (id,params) =>
    (dispatch) => {
        axios
        .patch(`${API_URL}/ToolsAndEquipments/${id}`,params, {
        headers: { 'Authorization': cookie.load('token') }
        })
        .then((response) => {
            axios
            .get(`${API_URL}/ToolsAndEquipments/${response.data.id}`, {
            headers: {'Authorization': cookie.load('token')}
            })
            .then((response) => {
                dispatch({type: TOOL_UPDATED, payload: response.data});
            })
            .catch((error) => {
                dispatch({
                    type: UPDATING_TOOL_ERROR,
                    error: error.response.data.error.message
                });
            });
        })
        .catch((error) => {
            dispatch({
                type: UPDATING_TOOL_ERROR,
                error: error.response.data.error.message
            });
        });
    }

/*
export const DeleteTool = (id) =>
    (dispatch) => {
        //console.log(`${API_URL}/ToolsAndEquipments/${id}?isDeleted=true&access_token=${cookie.load('token')}`);
        axios
        .patch(`${API_URL}/ToolsAndEquipments/${id}?filter={"include":"entity"}`,{isDeleted:true}, {
        headers: { 'Authorization': cookie.load('token') }
        })
        .then((response) => {
            dispatch({type: TOOL_DELETED, id: response.data.id});            
        })
        .catch((error) => {
            dispatch({
                type: DELETING_TOOL_ERROR,
                error: error.response.data.error.message
            });
        });
    };
*/

export const DeleteTool = (id) =>
    (dispatch) => {
        axios
        .patch(`${API_URL}/ToolsAndEquipments/${id}`,{isDeleted:true}, {
        headers: { 'Authorization': cookie.load('token') }
        })
        .then((response) => {
            dispatch({type: TOOL_DELETED, id: response.data.id});            
        })
        .catch((error) => {
            dispatch({
                type: DELETING_TOOL_ERROR,
                error: error.response.data.error.message
            });
        });
    };