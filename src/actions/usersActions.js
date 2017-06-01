import axios from 'axios';
import cookie from 'react-cookie';
import {API_URL} from '../constants/global';
import {USER_ADDED,ADDING_USER,ADDING_USER_ERROR,USER_EDITED,EDITING_USER,EDITING_USER_ERROR,USERS_FETCHED,FETCHING_USERS,FETCHING_USERS_ERROR} from '../constants/actionTypes';


export const FetchUsers = () =>
    (dispatch, getState) => {
        dispatch({type: FETCHING_USERS});

        axios
            .get(`${API_URL}/Accounts`,{
        headers: {'Authorization': cookie.load('token')}
        })
            .then((response) => {
                dispatch({type: USERS_FETCHED, list: response.data});
            })
            .catch((error) => {
                //console.log(error);
                dispatch({type: FETCHING_USERS_ERROR});
                //errorHandler(dispatch, error.response, FETCHING_APPOITMENTS_ERROR)
            });
    };

export const AddUser = (params) =>
    (dispatch, getState) => {
        dispatch({type: ADDING_USER});
        axios.post(`${API_URL}/Accounts`, params , {
        headers: {
            'Authorization': cookie.load('token')
        }
        })
            .then((response) => {
                dispatch({type: USER_ADDED, payload: response.data});
            })
            .catch((error) => {
                //console.log(error);
                dispatch({type: ADDING_USER_ERROR});
                //errorHandler(dispatch, error.response, FETCHING_APPOITMENTS_ERROR)
            });
    };

export const EditUser = (id,params) =>
    (dispatch, getState) => {
        dispatch({type: EDITING_USER});
        axios.patch(`${API_URL}/Accounts/${id}`, params , {
        headers: {
            'Authorization': cookie.load('token')
        }
        })
            .then((response) => {
                dispatch({type: USER_EDITED});
            })
            .catch((error) => {
                //console.log(error);
                dispatch({type: EDITING_USER_ERROR});
                //errorHandler(dispatch, error.response, FETCHING_APPOITMENTS_ERROR)
            });
    };