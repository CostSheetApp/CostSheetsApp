import axios from 'axios';
import cookie from 'react-cookie';
import {API_URL} from '../constants/global';
import {USER_ADDED,ADDING_USER,ADDING_USER_ERROR,USER_EDITED,EDITING_USER_ERROR,USERS_FETCHED,FETCHING_USERS,FETCHING_USERS_ERROR,USER_DELETED,DELETING_USER_ERROR} from '../constants/actionTypes';


export const FetchUsers = (entityId) =>
    (dispatch) => {
        dispatch({type: FETCHING_USERS});
        //console.log("Buscando Usuarios");
        //console.log(`${API_URL}/Entities/${entityId}/accounts?${cookie.load('token')}`);
        axios
            .get(`${API_URL}/Entities/${entityId}/accounts?filter={"where": {"isDeleted": false }}`,{
        headers: {'Authorization': cookie.load('token')}
        })
            .then((response) => {
                dispatch({type: USERS_FETCHED, list: response.data});
                //console.log("Devolvio Data");
            })
            .catch((error) => {
                //console.log(error);
                dispatch({
                    type: FETCHING_USERS_ERROR,
                    error: error.response.data.error.message
                });
                //errorHandler(dispatch, error.response, FETCHING_APPOITMENTS_ERROR)
            });
    };

export const AddUser = (entityId,params) =>
    (dispatch) => {
        dispatch({type: ADDING_USER});
        params.entityId = "1";
        axios.post(`${API_URL}/Entities/${entityId}/accounts`, params , {
        headers: {
            'Authorization': cookie.load('token')
        }
        })
            .then((response) => {
                dispatch({type: USER_ADDED, payload: response.data});
            })
            .catch((error) => {
                dispatch({
                    type: ADDING_USER_ERROR,
                    error: error.response.data.error.message
                });
                //errorHandler(dispatch, error.response, FETCHING_APPOITMENTS_ERROR)
            });
    };

/*
export const EditUser = (id,params) =>
    (dispatch) => {
        dispatch({type: EDITING_USER});
        params.entityId = "1";
        axios.patch(`${API_URL}/accounts/${id}`, params , {
        headers: {
            'Authorization': cookie.load('token')
        }
        })
            .then(() => {
                dispatch({type: USER_EDITED});
            })
            .catch((error) => {
                dispatch({
                    type: EDITING_USER_ERROR,
                    error: error.response.data.error.message
                });
                //errorHandler(dispatch, error.response, FETCHING_APPOITMENTS_ERROR)
            });
    };
*/


export const EditUser = (id,params) =>
    (dispatch) => {
        axios
        .patch(`${API_URL}/accounts/${id}`,params, {
        headers: { 'Authorization': cookie.load('token') }
        })
        .then((response) => {
            axios
            .get(`${API_URL}/accounts/${response.data.id}`, {
            headers: {'Authorization': cookie.load('token')}
            })
            .then((response) => {
                dispatch({type: USER_EDITED, payload: response.data});
            })
            .catch((error) => {
                dispatch({
                    type: EDITING_USER_ERROR,
                    error: error.response.data.error.message
                });
            });
        })
        .catch((error) => {
            dispatch({
                type: EDITING_USER_ERROR,
                error: error.response.data.error.message
            });
        });
    };


export const DeleteUser = (id) =>
    (dispatch) => {
        axios
        .patch(`${API_URL}/accounts/${id}`,{isDeleted:true}, {
        headers: { 'Authorization': cookie.load('token') }
        })
        .then((response) => {
            dispatch({type: USER_DELETED, id: response.data.id});            
        })
        .catch((error) => {
            dispatch({
                type: DELETING_USER_ERROR,
                error: error.response.data.error.message
            });
        });
    };