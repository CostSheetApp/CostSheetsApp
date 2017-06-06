import axios from 'axios';
import cookie from 'react-cookie';
import {API_URL} from '../constants/global';
import {push} from 'react-router-redux';
import {ADDING_COST_SHEET_ERROR,FETCHING_COST_SHEETS,COST_SHEETS_FETCHED,FETCHING_COST_SHEETS_ERROR} from '../constants/actionTypes';

export const FetchCostSheets = (entityId) =>
    (dispatch, getState) => {
        dispatch({type: FETCHING_COST_SHEETS});
        axios
        .get(`${API_URL}/Entities/${entityId}/costSheets?filter={"include":["unitsOfMeasurement","region"]}`, {
        headers: {'Authorization': cookie.load('token')}
        })
        .then((response) => {
            dispatch({type: COST_SHEETS_FETCHED, payload: response.data });
        })
        .catch((error) => {
            console.log(error);
            dispatch({type: FETCHING_COST_SHEETS_ERROR});
        });
    }


export const FetchCostSheet = (id) =>
    (dispatch, getState) => {
        axios
        .get(`${API_URL}/CostSheets/${id}?filter={"include":["unitsOfMeasurement","region"]}`, {
        headers: {'Authorization': cookie.load('token')}
        })
        .then((response) => {
            dispatch({type: COST_SHEET_ADDED, payload: response.data });
        })
        .catch((error) => {
            console.log(error);
            //dispatch({type: ADDING_COST_SHEET_ERROR});
        });
    }

export const FetchCostSheetMaterials = (id) =>
    (dispatch, getState) => {
        
    }

export const FetchCostSheetManpower = (id) =>
    (dispatch, getState) => {
        
    }

export const FetchCostSheetToolsAndEquipment = (id) =>
    (dispatch, getState) => {
        
    }

export const AddCostSheet = (entityId) =>
    (dispatch, getState) => {
        axios
        .post(`${API_URL}/Entities/${entityId}/costSheets`,{regionId:1,unitsOfMeasurementId:1}, {
        headers: {'Authorization': cookie.load('token')}
        })
        .then((response) => {
            dispatch(push(`/cost-sheets/${response.data.id}`));
        })
        .catch((error) => {
            console.log(error);
            dispatch({type: ADDING_COST_SHEET_ERROR});
        });
    }




