import axios from 'axios';
import cookie from 'react-cookie';
import {API_URL} from '../constants/global';
import {PROJECTS_FETCHED,FETCHING_PROJECTS,FETCHING_PROJECTS_ERROR,PROJECT_ADDED,ADDING_PROJECT,ADDING_PROJECT_ERROR,PROJECT_EDITED,EDITING_PROJECT,EDITING_PROJECT_ERROR} from '../constants/actionTypes';

export const FetchProjects = (entityId) =>
    (dispatch, getState) => {
        dispatch({type: FETCHING_PROJECTS});

        axios
            .get(`${API_URL}/Entities/${entityId}/Projects`,{
        headers: {'Authorization': cookie.load('token')}
        })
            .then((response) => {
                dispatch({type: PROJECTS_FETCHED, list: response.data});
            })
            .catch((error) => {
                //console.log(error);
                dispatch({type: FETCHING_PROJECTS_ERROR});
                //errorHandler(dispatch, error.response, FETCHING_APPOITMENTS_ERROR)
            });
    };



export const AddProject = (entityId,params) =>
    (dispatch, getState) => {
        dispatch({type: ADDING_PROJECT});
        axios.post(`${API_URL}/Entities/${entityId}/Projects`, params , {
        headers: {
            'Authorization': cookie.load('token')
        }
        })
            .then((response) => {
                dispatch({type: PROJECT_ADDED, payload: response.data});
            })
            .catch((error) => {
                //console.log(error);
                dispatch({type: ADDING_PROJECT_ERROR});
                //errorHandler(dispatch, error.response, FETCHING_APPOITMENTS_ERROR)
            });
    };

export const EditProject = (id,params) =>
    (dispatch, getState) => {
        dispatch({type: EDITING_PROJECT});
        axios.patch(`${API_URL}/Projects/${id}`, params , {
        headers: {
            'Authorization': cookie.load('token')
        }
        })
            .then((response) => {
                dispatch({type: PROJECT_EDITED});
            })
            .catch((error) => {
                //console.log(error);
                dispatch({type: EDITING_PROJECT_ERROR});
                //errorHandler(dispatch, error.response, FETCHING_APPOITMENTS_ERROR)
            });
    };