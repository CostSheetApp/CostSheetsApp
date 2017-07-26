import axios from 'axios';
import cookie from 'react-cookie';
import {API_URL} from '../constants/global';
import {PROJECTS_FETCHED
        ,FETCHING_PROJECTS
        ,FETCHING_PROJECTS_ERROR

        ,PROJECTS_CONSOLIDATE_MATERIAL_FETCHED
        ,FETCHING_PROJECTS_CONSOLIDATE_MATERIAL
        ,FETCHING_PROJECTS_CONSOLIDATE_MATERIAL_ERROR

        ,PROJECTS_CONSOLIDATE_MANPOWER_FETCHED
        ,FETCHING_PROJECTS_CONSOLIDATE_MANPOWER
        ,FETCHING_PROJECTS_CONSOLIDATE_MANPOWER_ERROR

        ,PROJECTS_CONSOLIDATE_TOOLSANDEQUIPMENT_FETCHED
        ,FETCHING_PROJECTS_CONSOLIDATE_TOOLSANDEQUIPMENT
        ,FETCHING_PROJECTS_CONSOLIDATE_TOOLSANDEQUIPMENT_ERROR

        ,SELECT_PROJECT_TO_CONSOLIDATE

        ,FETCHING_PROJECTS_CONSOLIDATE_INDIRECTCOST
        ,PROJECTS_CONSOLIDATE_INDIRECTCOST_FETCHED
        ,FETCHING_PROJECTS_CONSOLIDATE_INDIRECTCOST_ERROR
       } from '../constants/actionTypes';

export const FetchProjects = (entityId, idProject) =>
    (dispatch) => {
        dispatch({type: FETCHING_PROJECTS});
        axios
            .get(`${API_URL}/Entities/${entityId}/Projects?filter={"where": {"isDeleted": false }}`,{
        headers: {'Authorization': cookie.load('token')}
        })
            .then((response) => {
                dispatch({type: PROJECTS_FETCHED, list: response.data});
                if(idProject){
                    dispatch(FetchConsolidateMaterial(idProject));
                    dispatch(FetchConsolidateManPower(idProject));
                    dispatch(FetchConsolidateToolsAndEquipment(idProject));
                    dispatch(FetchConsolidateIndirectCost(idProject));
                }
            })
            .catch((error) => {
                dispatch({
                    type: FETCHING_PROJECTS_ERROR,
                    error: error.response.data.error.message
                });
                //errorHandler(dispatch, error.response, FETCHING_APPOITMENTS_ERROR)
            });
    };

export const FetchConsolidateMaterial = (projectId) =>
    (dispatch) => {
        dispatch({type: FETCHING_PROJECTS_CONSOLIDATE_MATERIAL});

        axios
            .get(`${API_URL}/Projects/${projectId}/ConsolidateMaterial`,{
        headers: {'Authorization': cookie.load('token')}
        })
            .then((response) => {
                dispatch({type: PROJECTS_CONSOLIDATE_MATERIAL_FETCHED, list: response.data.data});
            })
            .catch((error) => {
                //console.log(error);
                dispatch({
                    type: FETCHING_PROJECTS_CONSOLIDATE_MATERIAL_ERROR,
                    error: error.response.data.error.message
                });
                //errorHandler(dispatch, error.response, FETCHING_APPOITMENTS_ERROR)
            });
    };

export const FetchConsolidateManPower = (projectId) =>
    (dispatch) => {
        dispatch({type: FETCHING_PROJECTS_CONSOLIDATE_MANPOWER});

        axios
            .get(`${API_URL}/Projects/${projectId}/ConsolidateManPower`,{
        headers: {'Authorization': cookie.load('token')}
        })
            .then((response) => {
                dispatch({type: PROJECTS_CONSOLIDATE_MANPOWER_FETCHED, list: response.data.data});
            })
            .catch((error) => {
                //console.log(error);
                dispatch({
                    type: FETCHING_PROJECTS_CONSOLIDATE_MANPOWER_ERROR,
                    error: error.response.data.error.message
                });
                //errorHandler(dispatch, error.response, FETCHING_APPOITMENTS_ERROR)
            });
    };

export const FetchConsolidateToolsAndEquipment = (projectId) =>
    (dispatch) => {
        dispatch({type: FETCHING_PROJECTS_CONSOLIDATE_TOOLSANDEQUIPMENT});

        axios
            .get(`${API_URL}/Projects/${projectId}/ConsolidateToolsAndEquipment`,{
        headers: {'Authorization': cookie.load('token')}
        })
            .then((response) => {
                dispatch({type: PROJECTS_CONSOLIDATE_TOOLSANDEQUIPMENT_FETCHED, list: response.data.data});
            })
            .catch((error) => {
                //console.log(error);
                dispatch({
                    type: FETCHING_PROJECTS_CONSOLIDATE_TOOLSANDEQUIPMENT_ERROR,
                    error: error.response.data.error.message
                });
                //errorHandler(dispatch, error.response, FETCHING_APPOITMENTS_ERROR)
            });
    };

export const SelectProject = (project) =>
    (dispatch) => {
        dispatch({type: SELECT_PROJECT_TO_CONSOLIDATE, project:project});
    };


export const FetchConsolidateIndirectCost = (projectId) =>
    (dispatch) => {
        dispatch({type: FETCHING_PROJECTS_CONSOLIDATE_INDIRECTCOST});

        axios
            .get(`${API_URL}/Projects/${projectId}/indirectCosts`,{
        headers: {'Authorization': cookie.load('token')}
        })
            .then((response) => {
                dispatch({type: PROJECTS_CONSOLIDATE_INDIRECTCOST_FETCHED, list: response.data});
            })
            .catch((error) => {
                //console.log(error);
                dispatch({
                    type: FETCHING_PROJECTS_CONSOLIDATE_INDIRECTCOST_ERROR,
                    error: error.response.data.error.message
                });
                //errorHandler(dispatch, error.response, FETCHING_APPOITMENTS_ERROR)
            });
    };