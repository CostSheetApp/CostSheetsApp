import axios from 'axios';
import cookie from 'react-cookie';
import {API_URL} from '../constants/global';
import {USER_ADDED,ADDING_USER,ADDING_USER_ERROR,USER_EDITED,EDITING_USER,EDITING_USER_ERROR,USERS_FETCHED,FETCHING_USERS,FETCHING_USERS_ERROR} from '../constants/actionTypes';


export const FetchUsers = (entityId) =>
    (dispatch, getState) => {
        dispatch({type: FETCHING_USERS});
        console.log("Buscando Usuarios");
        console.log(`${API_URL}/Entities/${entityId}/accounts?${cookie.load('token')}`);
        axios
            .get(`${API_URL}/Entities/${entityId}/accounts`,{
        headers: {'Authorization': cookie.load('token')}
        })
            .then((response) => {
                dispatch({type: USERS_FETCHED, list: response.data});
                console.log("Devolvio Data");
            })
            .catch((error) => {
                console.log(error);
                dispatch({type: FETCHING_USERS_ERROR});
                //errorHandler(dispatch, error.response, FETCHING_APPOITMENTS_ERROR)
            });
    };

export const AddUser = (entityId,params) =>
    (dispatch, getState) => {
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
                console.log(error);
                dispatch({type: ADDING_USER_ERROR});
                //errorHandler(dispatch, error.response, FETCHING_APPOITMENTS_ERROR)
            });
    };

export const EditUser = (id,params) =>
    (dispatch, getState) => {
        dispatch({type: EDITING_USER});
        params.entityId = "1";
        axios.patch(`${API_URL}/accounts/${id}`, params , {
        headers: {
            'Authorization': cookie.load('token')
        }
        })
            .then((response) => {
                dispatch({type: USER_EDITED});
            })
            .catch((error) => {
                console.log(error);
                dispatch({type: EDITING_USER_ERROR});
                //errorHandler(dispatch, error.response, FETCHING_APPOITMENTS_ERROR)
            });
    };