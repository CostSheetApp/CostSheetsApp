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
    UPDATING_MANPOWER_ERROR,
    MANPOWERS_JOBS_FETCHED,
    FETCHING_MANPOWERS_JOBS_ERROR,
    MANPOWER_DELETED,
    DELETING_MANPOWER_ERROR
} from '../constants/actionTypes';

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


export const FetchManPowerCostHistory = (id) => (dispatch) => {
    dispatch({type: FETCHING_MANPOWER_COST_HISTORY});

    axios
        .get(`${API_URL}/Manpowers/${id}/manpowerCostHistories?filter={"include":"region"}`, {
        headers: {'Authorization': cookie.load('token')}
    })
        .then((response) => {
            dispatch({type: MANPOWER_COST_HISTORY_FETCHED, list: response.data});
        })
        .catch((error) => {
            dispatch({
                type: FETCHING_MANPOWER_COST_HISTORY_ERROR,
                error: error.response.data.error.message
            });
        });
};

export const FetchJobs = () => (dispatch) => {

        axios
        .get(`${API_URL}/Jobs?filter={"where": {"isDeleted": false }}`, {
        headers: {'Authorization': cookie.load('token')}
        })
        .then((response) => {
            dispatch({type: MANPOWERS_JOBS_FETCHED, payload: response.data});
        })
        .catch((error) => {
            //console.log(error);
            dispatch({
                type: FETCHING_MANPOWERS_JOBS_ERROR,
                error: error.response.data.error.message
            });
            //errorHandler(dispatch, error.response, FETCHING_APPOITMENTS_ERROR)
        });
};

export const AddManPower = (entityId,params) =>
    (dispatch) => {
        dispatch({type: ADDING_MANPOWER});
        //params.code = 1;
        //console.log(params);
        axios
        .post(`${API_URL}/Entities/${entityId}/manpowers/`,params, {
        headers: {'Authorization': cookie.load('token')}
        })
        .then((response) => {

            axios
            .get(`${API_URL}/manpowers/${response.data.id}?filter={"include":"job"}`, {
            headers: {'Authorization': cookie.load('token')}
            })
            .then((response) => {
                dispatch({type: MANPOWER_ADDED, payload: response.data});
            })
            .catch((error) => {
                dispatch({
                    type: ADDING_MANPOWER_ERROR,
                    error: error.response.data.error.message
                });
                //errorHandler(dispatch, error.response, FETCHING_APPOITMENTS_ERROR)
            });
        })
        .catch((error) => {
            dispatch({
                type: ADDING_MANPOWER_ERROR,
                error: error.response.data.error.message
            });
            //errorHandler(dispatch, error.response, FETCHING_APPOITMENTS_ERROR)
        });
    };

export const UpdateManPower = (id,params) =>
    (dispatch) => {
        axios
        .patch(`${API_URL}/Manpowers/${id}?filter={"include":"job"}`,params, {
        headers: { 'Authorization': cookie.load('token') }
        })
        .then((response) => {
            axios
            .get(`${API_URL}/Manpowers/${response.data.id}?filter={"include":"job"}`, {
            headers: {'Authorization': cookie.load('token')}
            })
            .then((response) => {
                dispatch({type: MANPOWER_UPDATED, payload: response.data});
            })
            .catch((error) => {
                dispatch({
                    type: UPDATING_MANPOWER_ERROR,
                    error: error.response.data.error.message
                });
            });
        })
        .catch((error) => {
            dispatch({
                type: UPDATING_MANPOWER_ERROR,
                error: error.response.data.error.message
            });
        });
    };

export const DeleteManPower = (id) =>
    (dispatch) => {
        axios
        .patch(`${API_URL}/Manpowers/${id}?filter={"include":"job"}`,{isDeleted:true}, {
        headers: { 'Authorization': cookie.load('token') }
        })
        .then((response) => {
            dispatch({type: MANPOWER_DELETED, id: response.data.id});            
        })
        .catch((error) => {
            dispatch({
                type: DELETING_MANPOWER_ERROR,
                error: error.response.data.error.message
            });
        });
    };