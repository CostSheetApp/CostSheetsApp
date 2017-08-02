import axios from 'axios';
import cookie from 'react-cookie';
import {API_URL} from '../constants/global';
import {push} from 'react-router-redux';
import {PROJECTS_COSTSHEET_FETCHED, FETCHING_PROJECTS_COSTSHEET, FETCHING_PROJECTS_COSTSHEET_ERROR, PROJECTS_COSTSHEET_ADDED, ADDING_PROJECTS_COSTSHEET_ERROR} from '../constants/actionTypes';

export const FetchProjectsCostSheet = (idProject) =>
    (dispatch) => {
        dispatch({type: FETCHING_PROJECTS_COSTSHEET});

        axios
            .get(`${API_URL}/ProjectHasCostSheets?filter={"where": {"projectId": ${idProject}},"include":[{"costSheet":["unitsOfMeasurement","region","materials","manpowers","toolsAndEquipments"]},"region"]}`,{
        headers: {'Authorization': cookie.load('token')}
        })
            .then((response) => {
                dispatch({type: PROJECTS_COSTSHEET_FETCHED, list: response.data});
            })
            .catch((error) => {
                //console.log(error);
                dispatch({
                    type: FETCHING_PROJECTS_COSTSHEET_ERROR,
                    error: error.response.data.error.message
                });
                //errorHandler(dispatch, error.response, FETCHING_APPOITMENTS_ERROR)
            });
    };


export const ViewCostSheet = (id) =>
    (dispatch) => {
        dispatch(push(`/cost-sheets/${id}`));
    };


export const AddCostSheet = (params) =>
    (dispatch) => {
         axios
            .post(`${API_URL}/ProjectHasCostSheets`,params,{
        headers: {'Authorization': cookie.load('token')}
        })
            .then((response) => {
                axios
                    .get(`${API_URL}/ProjectHasCostSheets/${response.data.id}?filter={"include":[{"costSheet":["unitsOfMeasurement","region","materials","manpowers","toolsAndEquipments"]},"region"]}`,{
                headers: {'Authorization': cookie.load('token')}
                })
                    .then((response) => {
                        dispatch({type: PROJECTS_COSTSHEET_ADDED, payload: response.data});
                    })
                    .catch(() => {
                        //console.log(error);
                        // dispatch({
                        //     type: FETCHING_PROJECTS_COSTSHEET_ERROR,
                        //     error: error.response.data.error.message
                        // });
                        //errorHandler(dispatch, error.response, FETCHING_APPOITMENTS_ERROR)
                    });
                
            })
            .catch((error) => {
                //console.log(error);
                dispatch({
                    type: ADDING_PROJECTS_COSTSHEET_ERROR,
                    error: error.response.data.error.message
                });
                //errorHandler(dispatch, error.response, FETCHING_APPOITMENTS_ERROR)
            });
    };
