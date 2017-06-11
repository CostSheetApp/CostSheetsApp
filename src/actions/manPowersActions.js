import axios from 'axios';
import cookie from 'react-cookie';
import {API_URL} from '../constants/global';
import {
    MANPOWERS_FETCHED,
    FETCHING_MANPOWERS,
    FETCHING_MANPOWERS_ERROR,
    FETCHING_MANPOWER_COST_HISTORY,
    MANPOWER_COST_HISTORY_FETCHED,
    FETCHING_MANPOWER_COST_HISTORY_ERROR,
    MANPOWER_ADDED,
    ADDING_MANPOWER,
    ADDING_MANPOWER_ERROR,
    MANPOWER_UPDATED,
    UPDATING_MANPOWER_ERROR
} from '../constants/actionTypes';

export const FetchManPowers = (entityId) => (dispatch, getState) => {
    dispatch({type: FETCHING_MANPOWERS});

    axios
        .get(`${API_URL}/Entities/${entityId}/manpowers`, {
        headers: {'Authorization': cookie.load('token')}
    })
        .then((response) => {
            dispatch({type: MANPOWERS_FETCHED, list: response.data});
        })
        .catch((error) => {
            console.log(error);
            dispatch({type: FETCHING_MANPOWERS_ERROR});
        });
};


export const FetchManPowerCostHistory = (id) => (dispatch, getState) => {
    dispatch({type: FETCHING_MANPOWER_COST_HISTORY});

    axios
        .get(`${API_URL}/Manpowers/${id}/manpowerCostHistories?filter={"include":"region"}`, {
        headers: {'Authorization': cookie.load('token')}
    })
        .then((response) => {
            dispatch({type: MANPOWER_COST_HISTORY_FETCHED, list: response.data});
        })
        .catch((error) => {
            console.log(error);
            dispatch({type: FETCHING_MANPOWER_COST_HISTORY_ERROR});
        });
};


export const AddManPower = (entityId,params) =>
    (dispatch, getState) => {
        dispatch({type: ADDING_MANPOWER});
        //params.code = 1;
        console.log(params);
        axios
        .post(`${API_URL}/Entities/${entityId}/manpowers/`,params, {
        headers: {'Authorization': cookie.load('token')}
        })
        .then((response) => {

            axios
            .get(`${API_URL}/manpowers/${response.data.id}`, {
            headers: {'Authorization': cookie.load('token')}
            })
            .then((response) => {
                dispatch({type: MANPOWER_ADDED, payload: response.data});
            })
            .catch((error) => {
                console.log(error);
                dispatch({type: ADDING_MANPOWER_ERROR});
                //errorHandler(dispatch, error.response, FETCHING_APPOITMENTS_ERROR)
            });
        })
        .catch((error) => {
            console.log(error);
            dispatch({type: ADDING_MANPOWER_ERROR});
            //errorHandler(dispatch, error.response, FETCHING_APPOITMENTS_ERROR)
        });
    };

export const UpdateManPower = (id,params) =>
    (dispatch, getState) => {
        axios
        .patch(`${API_URL}/Manpowers/${id}`,params, {
        headers: { 'Authorization': cookie.load('token') }
        })
        .then((response) => {
            dispatch({type: MANPOWER_UPDATED, payload: response.data});
            FetchManPowers();
        })
        .catch((error) => {
            console.log(error);
            dispatch({type: UPDATING_MANPOWER_ERROR});
            //errorHandler(dispatch, error.response, FETCHING_APPOITMENTS_ERROR)
        });
    };