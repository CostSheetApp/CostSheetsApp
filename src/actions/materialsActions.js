import axios from 'axios';
import cookie from 'react-cookie';
import {API_URL} from '../constants/global';
import {MATERIALS_FETCHED,FETCHING_MATERIALS} from '../constants/actionTypes';

export const FetchMaterials = () =>
    (dispatch, getState) => {
        dispatch({type: FETCHING_MATERIALS});

        axios
            .get(`${API_URL}/materials?filter={"include":"unitsOfMeasurement"}`,{
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



export const FetchMaterialCostHistory = (id) =>
    (dispatch, getState) => {
        
    }

