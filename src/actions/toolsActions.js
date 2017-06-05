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
    UPDATING_TOOL_ERROR
} from '../constants/actionTypes';

export const FetchTools = (entityId) => (dispatch, getState) => {
    dispatch({type: FETCHING_TOOLS});

    axios
        .get(`${API_URL}/Entities/${entityId}/toolsAndEquipments`, {
        headers: {'Authorization': cookie.load('token')}
    })
        .then((response) => {
            dispatch({type: TOOLS_FETCHED, list: response.data});
        })
        .catch((error) => {
            console.log(error);
            dispatch({type: FETCHING_TOOLS_ERROR});
        });
};

export const FetchToolCostHistory = (id) => (dispatch, getState) => {
    dispatch({type: FETCHING_TOOL_COST_HISTORY});

    axios
        .get(`${API_URL}/ToolsAndEquipments/${id}/toolsAndEquipmentCostHistories?filter={"include":"region"}`, {
        headers: {'Authorization': cookie.load('token')}
    })
        .then((response) => {
            dispatch({type: TOOL_COST_HISTORY_FETCHED, list: response.data});
        })
        .catch((error) => {
            console.log(error);
            dispatch({type: FETCHING_TOOL_COST_HISTORY_ERROR});
        });
};

export const AddTool = (entityId,params) =>
    (dispatch, getState) => {
        dispatch({type: ADDING_TOOL});
        params.code = 1;
        console.log(params);
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
                console.log(error);
                dispatch({type: ADDING_TOOL_ERROR});
                //errorHandler(dispatch, error.response, FETCHING_APPOITMENTS_ERROR)
            });
        })
        .catch((error) => {
            console.log(error);
            dispatch({type: ADDING_TOOL_ERROR});
            //errorHandler(dispatch, error.response, FETCHING_APPOITMENTS_ERROR)
        });
    };

export const UpdateTool = (id,params) =>
    (dispatch, getState) => {
        axios
        .patch(`${API_URL}/ToolsAndEquipments/${id}`,params, {
        headers: { 'Authorization': cookie.load('token') }
        })
        .then((response) => {
            dispatch({type: TOOL_UPDATED, payload: response.data});
            FetchTools();
        })
        .catch((error) => {
            console.log(error);
            dispatch({type: UPDATING_TOOL_ERROR});
            //errorHandler(dispatch, error.response, FETCHING_APPOITMENTS_ERROR)
        });
    };