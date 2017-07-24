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
    SELECT_MATERIAL_TO_BE_ADD_TO_COSTSHEET,
    
    SUM_COST_SHEET_MATERIALS_FETCHED,
    SUM_FETCHED_COST_SHEET_MATERIALS_ERROR,
    SUM_COST_SHEET_MANPOWER_FETCHED,
    SUM_FETCHED_COST_SHEET_MANPOWER_ERROR,
    SUM_COST_SHEET_TOOLS_AND_EQUIPMENT_FETCHED,
    SUM_FETCHED_COST_SHEET_TOOLS_AND_EQUIPMENT_ERROR
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
        .get(`${API_URL}/CostSheetHasMaterials/${id}/DetailsMaterials`, {
        headers: {'Authorization': cookie.load('token')}
        })
        .then((response) => {
            dispatch({type: COST_SHEET_MATERIALS_FETCHED, payload: response.data.data });
        })
        .catch((error) => {
            dispatch({type: FETCHED_COST_SHEET_MATERIALS_ERROR, error: error.response.data.error.message});
        });
    };

export const FetchCostSheetManpower = (id) =>
    (dispatch) => {
        axios
        .get(`${API_URL}/CostSheetHasManpowers/${id}/DetailsManPowers`, {
        headers: {'Authorization': cookie.load('token')}
        })
        .then((response) => {
            dispatch({type: COST_SHEET_MANPOWER_FETCHED, payload: response.data.data });
        })
        .catch((error) => {
            dispatch({type: FETCHED_COST_SHEET_MANPOWER_ERROR, error: error.response.data.error.message});
        });
    };

export const FetchCostSheetToolsAndEquipment = (id) =>
    (dispatch) => {
        axios
        .get(`${API_URL}/CostSheetHasToolsAndEquipments/${id}/DetailsToolsAndEquipment`, {
        headers: {'Authorization': cookie.load('token')}
        })
        .then((response) => {
            dispatch({type: COST_SHEET_TOOLS_AND_EQUIPMENT_FETCHED, payload: response.data.data });
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
        //console.log(material);
        //console.log(material.waste);
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
            .get(`${API_URL}/CostSheetHasMaterials/${costSheetId}/DetailsMaterials`, {
            headers: {'Authorization': cookie.load('token')}
            })
            .then((response) => {
                dispatch({type: COST_SHEET_MATERIALS_FETCHED, payload: response.data.data });
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
        .post(`${API_URL}/CostSheetHasManpowers`,params, {
        headers: {'Authorization': cookie.load('token')}
        })
        .then(() => {
            axios
            .get(`${API_URL}/CostSheetHasManpowers/${costSheetId}/DetailsManPowers`, {
            headers: {'Authorization': cookie.load('token')}
            })
            .then((response) => {
                dispatch({type: COST_SHEET_MANPOWER_FETCHED, payload: response.data.data });
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
        .post(`${API_URL}/CostSheetHasToolsAndEquipments`,params, {
        headers: {'Authorization': cookie.load('token')}
        })
        .then(() => {
            axios
            .get(`${API_URL}/CostSheetHasToolsAndEquipments/${costSheetId}/DetailsToolsAndEquipment`, {
            headers: {'Authorization': cookie.load('token')}
            })
            .then((response) => {
                dispatch({type: COST_SHEET_TOOLS_AND_EQUIPMENT_FETCHED, payload: response.data.data });
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


export const FetchSumSheetMaterials = (id) =>
    (dispatch) => {
        axios                                         
        .get(`${API_URL}/CostSheetHasMaterials/${id}/TotalMaterial`, {
        headers: {'Authorization': cookie.load('token')}
        })
        .then((response) => {
            dispatch({type: SUM_COST_SHEET_MATERIALS_FETCHED, payload: response.data.data });
        })
        .catch((error) => {
            dispatch({type: SUM_FETCHED_COST_SHEET_MATERIALS_ERROR, error: error.response.data.error.message});
        });
    };


export const FetchSumSheetManpower = (id) =>
    (dispatch) => {
        axios
        .get(`${API_URL}/CostSheetHasManpowers/${id}/TotalManPower`, {
        headers: {'Authorization': cookie.load('token')}
        })
        .then((response) => {
            dispatch({type: SUM_COST_SHEET_MANPOWER_FETCHED, payload: response.data.data });
        })
        .catch((error) => {
            dispatch({type: SUM_FETCHED_COST_SHEET_MANPOWER_ERROR, error: error.response.data.error.message});
        });
    };


export const FetchSumSheetToolsAndEquipment = (id) =>
    (dispatch) => {
        axios
        .get(`${API_URL}/CostSheetHasToolsAndEquipments/${id}/TotalToolEquipment`, {
        headers: {'Authorization': cookie.load('token')}
        })
        .then((response) => {
            dispatch({type: SUM_COST_SHEET_TOOLS_AND_EQUIPMENT_FETCHED, payload: response.data.data });
        })
        .catch((error) => {
            dispatch({type: SUM_FETCHED_COST_SHEET_TOOLS_AND_EQUIPMENT_ERROR, error: error.response.data.error.message});
        });
    };
