import axios from 'axios';
import cookie from 'react-cookie';
import {API_URL} from '../constants/global';
import {REGIONS_FETCHED,FETCHING_REGIONS,FETCHING_REGIONS_ERROR,REGION_ADDED,ADDING_REGION,ADDING_REGION_ERROR,REGION_EDITED,EDITING_REGION,EDITING_REGION_ERROR} from '../constants/actionTypes';

export const FetchRegions = (entityId) =>
    (dispatch, getState) => {
        dispatch({type: FETCHING_REGIONS});

        axios
            .get(`${API_URL}/Entities/${entityId}/regions`,{
        headers: {'Authorization': cookie.load('token')}
        })
            .then((response) => {
                dispatch({type: REGIONS_FETCHED, list: response.data});
            })
            .catch((error) => {
                //console.log(error);
                dispatch({type: FETCHING_REGIONS_ERROR});
                //errorHandler(dispatch, error.response, FETCHING_APPOITMENTS_ERROR)
            });
    };



export const AddRegion = (entityId,params) =>
    (dispatch, getState) => {
        dispatch({type: ADDING_REGION});
        axios.post(`${API_URL}/Entities/${entityId}/Regions`, params , {
        headers: {
            'Authorization': cookie.load('token')
        }
        })
            .then((response) => {
                dispatch({type: REGION_ADDED, payload: response.data});
            })
            .catch((error) => {
                //console.log(error);
                dispatch({type: ADDING_REGION_ERROR});
                //errorHandler(dispatch, error.response, FETCHING_APPOITMENTS_ERROR)
            });
    };

export const EditRegion = (id,params) =>
    (dispatch, getState) => {
        dispatch({type: EDITING_REGION});
        axios.patch(`${API_URL}/Regions/${id}`, params , {
        headers: {
            'Authorization': cookie.load('token')
        }
        })
            .then((response) => {
                dispatch({type: REGION_EDITED});
            })
            .catch((error) => {
                //console.log(error);
                dispatch({type: EDITING_REGION_ERROR});
                //errorHandler(dispatch, error.response, FETCHING_APPOITMENTS_ERROR)
            });
    };