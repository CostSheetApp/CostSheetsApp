import axios from 'axios';
import cookie from 'react-cookie';
import {API_URL} from '../constants/global';
import {push} from 'react-router-redux';
import {
    ADDING_COST_SHEET_ERROR,
    //COST_SHEET_ADDED,
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
    (dispatch) => {
        dispatch({type: FETCHING_COST_SHEETS});
        axios
        .get(`${API_URL}/Entities/${entityId}/costSheets?filter={"include":["unitsOfMeasurement","region"]}`, {
        headers: {'Authorization': cookie.load('token')}
        })
        .then((response) => {
            dispatch({type: COST_SHEETS_FETCHED, payload: response.data });
        })
        .catch((error) => {
            dispatch({type: FETCHING_COST_SHEETS_ERROR,error: error.response.data.error.message});
        });
    };


export const FetchCostSheet = (id) =>
    (dispatch) => {
        axios
        .get(`${API_URL}/CostSheets/${id}?filter={"include":["unitsOfMeasurement","region","materials","manpowers","toolsAndEquipments"]}`, {
        headers: {'Authorization': cookie.load('token')}
        })
        .then((response) => {
            dispatch({type: COST_SHEET_FETCHED, payload: response.data });
        })
        .catch((error) => {
            dispatch({type: FETCHED_COST_SHEET_ERROR, error: error.response.data.error.message});
        });
    };

export const FetchCostSheetMaterials = (id) =>
    (dispatch) => {
        axios                                         
        .get(`${API_URL}/CostSheetHasMaterials?filter={"where":{"costSheetId":${id}},"include":{"material":["materialCostHistories","unitsOfMeasurement"]}}`, {
        headers: {'Authorization': cookie.load('token')}
        })
        .then((response) => {
            dispatch({type: COST_SHEET_MATERIALS_FETCHED, payload: response.data });
        })
        .catch((error) => {
            dispatch({type: FETCHED_COST_SHEET_MATERIALS_ERROR, error: error.response.data.error.message});
        });
    };

export const FetchCostSheetManpower = (id) =>
    (dispatch) => {
        axios
        .get(`${API_URL}/CostSheetHasManpowers?filter={"where":{"costSheetId":${id}},"include":{"manpower":["manpowerCostHistories","job"]}}`, {
        headers: {'Authorization': cookie.load('token')}
        })
        .then((response) => {
            dispatch({type: COST_SHEET_MANPOWER_FETCHED, payload: response.data });
        })
        .catch((error) => {
            dispatch({type: FETCHED_COST_SHEET_MANPOWER_ERROR, error: error.response.data.error.message});
        });
    };

export const FetchCostSheetToolsAndEquipment = (id) =>
    (dispatch) => {
        axios
        .get(`${API_URL}/CostSheetHasToolsAndEquipments?filter={"where":{"costSheetId":${id}},"include":["toolsAndEquipmentCostHistories","toolsAndEquipment"]}`, {
        headers: {'Authorization': cookie.load('token')}
        })
        .then((response) => {
            dispatch({type: COST_SHEET_TOOLS_AND_EQUIPMENT_FETCHED, payload: response.data });
        })
        .catch((error) => {
            dispatch({type: FETCHED_COST_SHEET_TOOLS_AND_EQUIPMENT_ERROR, error: error.response.data.error.message});
        });
    };

export const AddCostSheet = (entityId) =>
    (dispatch) => {
        axios
        .post(`${API_URL}/Entities/${entityId}/costSheets`,{regionId:1,unitsOfMeasurementId:1}, {
        headers: {'Authorization': cookie.load('token')}
        })
        .then((response) => {
           // dispatch({type: COST_SHEET_ADDED, payload: response.data });
            dispatch(push(`/cost-sheets/${response.data.id}`));
        })
        .catch((error) => {
            dispatch({type: ADDING_COST_SHEET_ERROR, error: error.response.data.error.message});
        });
    };


export const ViewCostSheet = (id) =>
    (dispatch) => {
        dispatch(push(`/cost-sheets/${id}`));
    };


export const SelectMaterialToBeAddToCostSheet = (material) =>
    (dispatch) => {
        console.log(material);
        console.log(material.waste);
        dispatch({type: SELECT_MATERIAL_TO_BE_ADD_TO_COSTSHEET, material:material});
    };

export const AddMaterial = (costSheetId, params) =>
    (dispatch) => {
        axios
        .post(`${API_URL}/CostSheetHasMaterials`,params, {
        headers: {'Authorization': cookie.load('token')}
        })
        .then(() => {
            axios
            .get(`${API_URL}/CostSheetHasMaterials?filter={"where":{"costSheetId":${costSheetId}},"include":{"material":["materialCostHistories","unitsOfMeasurement"]}}`, {
            headers: {'Authorization': cookie.load('token')}
            })
            .then((response) => {
                dispatch({type: COST_SHEET_MATERIALS_FETCHED, payload: response.data });
            })
            .catch((error) => {
                dispatch({type: FETCHED_COST_SHEET_MATERIALS_ERROR, error: error.response.data.error.message});
                //errorHandler(dispatch, error.response, FETCHING_APPOITMENTS_ERROR)
            });
        })
        .catch((error) => {
            dispatch({type: ADDING_COST_SHEET_ERROR, error: error.response.data.error.message});
        });
    };


export const AddManPower = (costSheetId, params) =>
    (dispatch) => {
        axios
        .post(`${API_URL}/CostSheets/${costSheetId}/manpowers`,params, {
        headers: {'Authorization': cookie.load('token')}
        })
        .then(() => {
            axios
            .get(`${API_URL}/CostSheetHasManpowers?filter={"where":{"costSheetId":${costSheetId}},"include":{"manpower":["manpowerCostHistories","job"]}}`, {
            headers: {'Authorization': cookie.load('token')}
            })
            .then((response) => {
                dispatch({type: COST_SHEET_MANPOWER_FETCHED, payload: response.data });
            })
            .catch((error) => {
                dispatch({type: FETCHED_COST_SHEET_MANPOWER_ERROR, error: error.response.data.error.message});
                //errorHandler(dispatch, error.response, FETCHING_APPOITMENTS_ERROR)
            });
        })
        .catch((error) => {
            dispatch({type: ADDING_COST_SHEET_ERROR, error: error.response.data.error.message});
        });
    };

export const AddToolsAndEquipment = (costSheetId, params) =>
    (dispatch) => {
        axios
        .post(`${API_URL}/CostSheets/${costSheetId}/toolsAndEquipments`,params, {
        headers: {'Authorization': cookie.load('token')}
        })
        .then(() => {
            axios
            .get(`${API_URL}/CostSheetHasToolsAndEquipments?filter={"where":{"costSheetId":${costSheetId}},"include":["toolsAndEquipmentCostHistories","toolsAndEquipment"]}`, {
            headers: {'Authorization': cookie.load('token')}
            })
            .then((response) => {
                dispatch({type: COST_SHEET_TOOLS_AND_EQUIPMENT_FETCHED, payload: response.data });
            })
            .catch((error) => {
                dispatch({type: FETCHED_COST_SHEET_MANPOWER_ERROR, error: error.response.data.error.message});
                //errorHandler(dispatch, error.response, FETCHING_APPOITMENTS_ERROR)
            });
        })
        .catch((error) => {
            dispatch({type: FETCHED_COST_SHEET_MANPOWER_ERROR, error: error.response.data.error.message});
        });
    };