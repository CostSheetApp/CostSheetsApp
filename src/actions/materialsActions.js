import axios from 'axios';
import cookie from 'react-cookie';
import {API_URL} from '../constants/global';
import {
    MATERIALS_FETCHED,
    FETCHING_MATERIALS,
    FETCHING_MATERIALS_ERROR,
    FETCHING_MATERIAL_COST_HISTORY,
    MATERIAL_COST_HISTORY_FETCHED,
    FETCHING_MATERIAL_COST_HISTORY_ERROR,
    MATERIAL_UNITS_OF_MEASUREMENT_FETCHED,
    FETCHING_MATERIAL_UNITS_OF_MEASUREMENT_ERROR,
    MATERIAL_ADDED,
    ADDING_MATERIAL,
    ADDING_MATERIAL_ERROR,
    MATERIAL_UPDATED,
    UPDATING_MATERIAL_ERROR
} from '../constants/actionTypes';

export const FetchMaterials = (entityId) => (dispatch, getState) => {
    dispatch({type: FETCHING_MATERIALS});

    axios
        .get(`${API_URL}/Entities/${entityId}/materials?filter={"include":"unitsOfMeasurement"}`, {
        headers: {'Authorization': cookie.load('token')}
    })
        .then((response) => {
            dispatch({type: MATERIALS_FETCHED, list: response.data});
        })
        .catch((error) => {
            console.log(error);
            dispatch({type: FETCHING_MATERIALS_ERROR});
            //errorHandler(dispatch, error.response, FETCHING_APPOITMENTS_ERROR)
        });
}

export const FetchMaterialCostHistory = (id) => (dispatch, getState) => {
    dispatch({type: FETCHING_MATERIAL_COST_HISTORY});

    axios
        .get(`${API_URL}/Materials/${id}/materialCostHistories?filter={"include":"region"}`, {
        headers: {'Authorization': cookie.load('token')}
    })
        .then((response) => {
            dispatch({type: MATERIAL_COST_HISTORY_FETCHED, list: response.data});
        })
        .catch((error) => {
            console.log(error);
            dispatch({type: FETCHING_MATERIAL_COST_HISTORY_ERROR});
            //errorHandler(dispatch, error.response, FETCHING_APPOITMENTS_ERROR)
        });
}

export const FetchUnitsOfMeasurement = () => (dispatch, getState) => {

        axios
        .get(`${API_URL}/UnitsOfMeasurements`, {
        headers: {'Authorization': cookie.load('token')}
        })
        .then((response) => {
            dispatch({type: MATERIAL_UNITS_OF_MEASUREMENT_FETCHED, payload: response.data});
        })
        .catch((error) => {
            console.log(error);
            dispatch({type: FETCHING_MATERIAL_UNITS_OF_MEASUREMENT_ERROR});
            //errorHandler(dispatch, error.response, FETCHING_APPOITMENTS_ERROR)
        });
}

export const AddMaterial = (entityId,params) =>
    (dispatch, getState) => {
        dispatch({type: ADDING_MATERIAL});
        //params.code = 1;
        axios
        .post(`${API_URL}/Entities/${entityId}/materials`,params, {
        headers: {'Authorization': cookie.load('token')}
        })
        .then((response) => {

            axios
            .get(`${API_URL}/Materials/${response.data.id}?filter={"include":"unitsOfMeasurement"}`, {
            headers: {'Authorization': cookie.load('token')}
            })
            .then((response) => {
                dispatch({type: MATERIAL_ADDED, payload: response.data});
            })
            .catch((error) => {
                console.log(error);
                dispatch({type: ADDING_MATERIAL_ERROR});
                //errorHandler(dispatch, error.response, FETCHING_APPOITMENTS_ERROR)
            });
        })
        .catch((error) => {
            console.log(error);
            dispatch({type: ADDING_MATERIAL_ERROR});
            //errorHandler(dispatch, error.response, FETCHING_APPOITMENTS_ERROR)
        });
    }

export const UpdateMaterial = (id,params) =>
    (dispatch, getState) => {
        axios
        .patch(`${API_URL}/Materials/${id}?filter={"include":"unitsOfMeasurement"}`,params, {
        headers: { 'Authorization': cookie.load('token') }
        })
        .then((response) => {
            dispatch({type: MATERIAL_UPDATED, payload: response.data});
            FetchMaterials();
        })
        .catch((error) => {
            console.log(error);
            dispatch({type: UPDATING_MATERIAL_ERROR});
            //errorHandler(dispatch, error.response, FETCHING_APPOITMENTS_ERROR)
        });
    }