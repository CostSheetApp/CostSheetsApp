import axios from 'axios';
import cookie from 'react-cookie';
import {API_URL} from '../constants/global';
import {push} from 'react-router-redux';
import {
    ADDING_COST_SHEET_ERROR,
    COST_SHEET_ADDED,
    FETCHING_COST_SHEETS,
    COST_SHEETS_FETCHED,
    FETCHING_COST_SHEETS_ERROR,
    COST_SHEET_FETCHED,
    FETCHED_COST_SHEET_ERROR,
    COST_SHEET_MATERIALS_FETCHED,
    FETCHED_COST_SHEET_MATERIALS_ERROR,
    COST_SHEET_MANPOWER_FETCHED,
    FETCHED_COST_SHEET_MANPOWER_ERROR,
    COST_SHEET_TOOLS_AND_EQUIPMENT_FETCHED,
    FETCHED_COST_SHEET_TOOLS_AND_EQUIPMENT_ERROR,
    SELECT_MATERIAL_TO_BE_ADD_TO_COSTSHEET
} from '../constants/actionTypes';

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
            dispatch({type: FETCHING_COST_SHEETS_ERROR});
        });
    }


export const FetchCostSheet = (id) =>
    (dispatch, getState) => {
        axios
        .get(`${API_URL}/CostSheets/${id}?filter={"include":["unitsOfMeasurement","region","materials","manpowers","toolsAndEquipments"]}`, {
        headers: {'Authorization': cookie.load('token')}
        })
        .then((response) => {
            dispatch({type: COST_SHEET_FETCHED, payload: response.data });
        })
        .catch((error) => {
            dispatch({type: FETCHED_COST_SHEET_ERROR});
        });
    }

export const FetchCostSheetMaterials = (id) =>
    (dispatch, getState) => {
        axios                                         
        .get(`${API_URL}/CostSheetHasMaterials?filter={"where":{"costSheetId":${id}},"include":{"material":["materialCostHistories","unitsOfMeasurement"]}}`, {
        headers: {'Authorization': cookie.load('token')}
        })
        .then((response) => {
            dispatch({type: COST_SHEET_MATERIALS_FETCHED, payload: response.data });
        })
        .catch((error) => {
            dispatch({type: FETCHED_COST_SHEET_MATERIALS_ERROR});
        });
    }

export const FetchCostSheetManpower = (id) =>
    (dispatch, getState) => {
        axios
        .get(`${API_URL}/CostSheetHasManpowers?filter={"where":{"costSheetId":${id}},"include":{"manpower":["manpowerCostHistories","job"]}}`, {
        headers: {'Authorization': cookie.load('token')}
        })
        .then((response) => {
            dispatch({type: COST_SHEET_MANPOWER_FETCHED, payload: response.data });
        })
        .catch((error) => {
            dispatch({type: FETCHED_COST_SHEET_MANPOWER_ERROR});
        });
    }

export const FetchCostSheetToolsAndEquipment = (id) =>
    (dispatch, getState) => {
        axios
        .get(`${API_URL}/CostSheetHasToolsAndEquipments?filter={"where":{"costSheetId":${id}},"include":["toolsAndEquipmentCostHistories","toolsAndEquipment"]}`, {
        headers: {'Authorization': cookie.load('token')}
        })
        .then((response) => {
            dispatch({type: COST_SHEET_TOOLS_AND_EQUIPMENT_FETCHED, payload: response.data });
        })
        .catch((error) => {
            dispatch({type: FETCHED_COST_SHEET_TOOLS_AND_EQUIPMENT_ERROR});
        });
    }

export const AddCostSheet = (entityId) =>
    (dispatch, getState) => {
        axios
        .post(`${API_URL}/Entities/${entityId}/costSheets`,{regionId:1,unitsOfMeasurementId:1}, {
        headers: {'Authorization': cookie.load('token')}
        })
        .then((response) => {
           // dispatch({type: COST_SHEET_ADDED, payload: response.data });
            dispatch(push(`/cost-sheets/${response.data.id}`));
        })
        .catch((error) => {
            dispatch({type: ADDING_COST_SHEET_ERROR});
        });
    }


export const ViewCostSheet = (id) =>
    (dispatch, getState) => {
        dispatch(push(`/cost-sheets/${id}`));
    }


export const SelectMaterialToBeAddToCostSheet = (id) =>
    (dispatch, getState) => {
        dispatch({type: SELECT_MATERIAL_TO_BE_ADD_TO_COSTSHEET, id:id});
    }
