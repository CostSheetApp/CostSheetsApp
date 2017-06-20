import axios from 'axios';
import cookie from 'react-cookie';
import {API_URL} from '../constants/global';
import {
         JOB_ADDED
         ,ADDING_JOB
         ,ADDING_JOB_ERROR
         ,JOB_EDITED
         ,EDITING_JOB
         ,EDITING_JOB_ERROR
         ,JOBS_FETCHED
         ,FETCHING_JOBS
         ,FETCHING_JOBS_ERROR
         ,JOB_DELETED
         ,DELETING_JOB_ERROR
       } from '../constants/actionTypes';

export const FetchJobs = () =>
    (dispatch) => {
        dispatch({type: FETCHING_JOBS});

        axios
            .get(`${API_URL}/Jobs?filter={"where": {"isDeleted": false }}`,{
        headers: {'Authorization': cookie.load('token')}
        })
            .then((response) => {
                dispatch({type: JOBS_FETCHED, list: response.data});
            })
            .catch((error) => {
                //console.log(error);
                dispatch({
                    type: FETCHING_JOBS_ERROR,
                    error: error.response.data.error.message
                });
                //errorHandler(dispatch, error.response, FETCHING_APPOITMENTS_ERROR)
            });
    };

export const AddJob = (params) =>
    (dispatch) => {
        //console.log(params);
        dispatch({type: ADDING_JOB});
        axios.post(`${API_URL}/Jobs`, params , {
        headers: { 'Authorization': cookie.load('token') }
        })
            .then((response) => {
                dispatch({type: JOB_ADDED, payload: response.data});
            })
            .catch((error) => {
                //console.log(error);
                dispatch({
                    type: ADDING_JOB_ERROR,
                    error: error.response.data.error.message
                });
                //errorHandler(dispatch, error.response, FETCHING_APPOITMENTS_ERROR)
            });
    };

export const EditJob = (id,params) =>
    (dispatch) => {
        dispatch({type: EDITING_JOB});
        axios
        .patch(`${API_URL}/Jobs/${id}`,params, {
        headers: { 'Authorization': cookie.load('token') }
        })
        .then((response) => {
            axios
            .get(`${API_URL}/Jobs/${response.data.id}`, {
            headers: {'Authorization': cookie.load('token')}
            })
            .then((response) => {
                dispatch({type: JOB_EDITED, payload: response.data});
            })
            .catch((error) => {
                dispatch({
                    type: EDITING_JOB_ERROR,
                    error: error.response.data.error.message
                });
            });
        })
        .catch((error) => {
            dispatch({
                type: EDITING_JOB_ERROR,
                error: error.response.data.error.message
            });
        });
    };

export const DeleteJob = (id) =>
    (dispatch) => {
        axios
        .patch(`${API_URL}/Jobs/${id}`,{isDeleted:true}, {
        headers: { 'Authorization': cookie.load('token') }
        })
        .then((response) => {
            dispatch({type: JOB_DELETED, id: response.data.id});            
        })
        .catch((error) => {
            dispatch({
                type: DELETING_JOB_ERROR,
                error: error.response.data.error.message
            });
        });
    };
