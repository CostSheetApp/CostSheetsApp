import axios from 'axios';
import cookie from 'react-cookie';
import {API_URL} from '../constants/global';
import {push} from 'react-router-redux';
import {
    PROJECTS_FETCHED,
    FETCHING_PROJECTS,
    FETCHING_PROJECTS_ERROR,
    ADDING_PROJECT,
    ADDING_PROJECT_ERROR,
    PROJECT_EDITED,
    EDITING_PROJECT_ERROR,
    PROJECT_DELETED,
    DELETING_PROJECT_ERROR,
    PROJECT_INDIRECT_COSTS_FETCHED,
    FETCHING_PROJECT_INDIRECT_COSTS_ERROR,
    PROJECT_NEW_INDIRECT_COST_ADDED,
    ADDING_PROJECT_NEW_INDIRECT_COST_ERROR,
    DELETING_PROJECT_INDIRECT_COST_ERROR,
    DELETING_PROJECT_INDIRECT_COST_CHILDREN_ERROR
} from '../constants/actionTypes';

export const FetchProjects = (entityId) =>
    (dispatch) => {
        dispatch({type: FETCHING_PROJECTS});

        axios
            .get(`${API_URL}/Entities/${entityId}/Projects?filter={"where": {"isDeleted": false }}`,{
        headers: {'Authorization': cookie.load('token')}
        })
            .then((response) => {
                dispatch({type: PROJECTS_FETCHED, list: response.data});
            })
            .catch((error) => {
                //console.log(error);
                dispatch({
                    type: FETCHING_PROJECTS_ERROR,
                    error: error.response.data.error.message
                });
                //errorHandler(dispatch, error.response, FETCHING_APPOITMENTS_ERROR)
            });
    };





export const AddProject = (entityId,params) =>
    (dispatch) => {
        dispatch({type: ADDING_PROJECT});
        params.cost = 0;
        axios.post(`${API_URL}/Entities/${entityId}/Projects`, params , {
        headers: {
            'Authorization': cookie.load('token')
        }
        })
            .then((response) => {
                //dispatch({type: PROJECT_ADDED, payload: response.data});
                dispatch(push(`/projects/${response.data.id}`));
            })
            .catch((error) => {
                //console.log(error);
                dispatch({
                    type: ADDING_PROJECT_ERROR,
                    error: error.response.data.error.message
                });
                //errorHandler(dispatch, error.response, FETCHING_APPOITMENTS_ERROR)
            });
    };

/*
export const EditProject = (id,params) =>
    (dispatch) => {
        dispatch({type: EDITING_PROJECT});
        axios.patch(`${API_URL}/Projects/${id}`, params , {
        headers: {
            'Authorization': cookie.load('token')
        }
        })
            .then(() => {
                dispatch({type: PROJECT_EDITED});
            })
            .catch((error) => {
                //console.log(error);
                dispatch({
                    type: EDITING_PROJECT_ERROR,
                    error: error.response.data.error.message
                });
                //errorHandler(dispatch, error.response, FETCHING_APPOITMENTS_ERROR)
            });
    };
*/

export const EditProject = (id,params) =>
    (dispatch) => {
        axios
        .patch(`${API_URL}/Projects/${id}`,params, {
        headers: { 'Authorization': cookie.load('token') }
        })
        .then((response) => {
            axios
            .get(`${API_URL}/Projects/${response.data.id}`, {
            headers: {'Authorization': cookie.load('token')}
            })
            .then((response) => {
                dispatch({type: PROJECT_EDITED, payload: response.data});
            })
            .catch((error) => {
                dispatch({
                    type: EDITING_PROJECT_ERROR,
                    error: error.response.data.error.message
                });
            });
        })
        .catch((error) => {
            dispatch({
                type: EDITING_PROJECT_ERROR,
                error: error.response.data.error.message
            });
        });
    };


export const DeleteProject = (id) =>
    (dispatch) => {
        axios
        .patch(`${API_URL}/Projects/${id}`,{isDeleted:true}, {
        headers: { 'Authorization': cookie.load('token') }
        })
        .then((response) => {
            dispatch({type: PROJECT_DELETED, id: response.data.id});            
        })
        .catch((error) => {
            dispatch({
                type: DELETING_PROJECT_ERROR,
                error: error.response.data.error.message
            });
        });
    };


export const ViewProject = (id) =>
    (dispatch) => {
        dispatch(push(`/projects/${id}`));
    };

export const FetchIndirectCosts = (projectId) =>
    (dispatch) => {
        axios
            .get(`${API_URL}/Projects/${projectId}/indirectCosts`,{
        headers: {'Authorization': cookie.load('token')}
        })
            .then((response) => {
                dispatch({type: PROJECT_INDIRECT_COSTS_FETCHED, list: response.data});
            })
            .catch((error) => {
                dispatch({
                    type: FETCHING_PROJECT_INDIRECT_COSTS_ERROR,
                    error: error.response.data.error.message
                });
            });
    };

export const AddIndirectCost = (projectId,indirectCostId,description,amount,type) =>
    (dispatch) => {
        axios.post(`${API_URL}/Projects/${projectId}/indirectCosts`, {indirectCostId,description,amount,type} , {
        headers: {
            'Authorization': cookie.load('token')
        }
        })
            .then((response) => {
                dispatch({type: PROJECT_NEW_INDIRECT_COST_ADDED, payload: response.data});
                //dispatch(push(`/projects/${response.data.id}`));
            })
            .catch((error) => {
                //console.log(error);
                dispatch({
                    type: ADDING_PROJECT_NEW_INDIRECT_COST_ERROR,
                    error: error.response.data.error.message
                });
                //errorHandler(dispatch, error.response, FETCHING_APPOITMENTS_ERROR)
            });
    };

export const DeleteIndirectCost = (projectId,id) =>
    (dispatch) => {
        axios.delete(`${API_URL}/IndirectCosts/${id}/indirectCosts`, {
        headers: {
            'Authorization': cookie.load('token')
        }
        })
        .then(() => {
           
            axios.delete(`${API_URL}/Projects/${projectId}/indirectCosts/${id}`, {
            headers: {
                'Authorization': cookie.load('token')
            }
            })
            .then(() => {
                dispatch(FetchIndirectCosts(projectId));
                //dispatch({type: PROJECT_INDIRECT_COST_DELETED, id: id});
                //dispatch(push(`/projects/${response.data.id}`));
            })
            .catch((error) => {
                //console.log(error);
                dispatch({
                    type: DELETING_PROJECT_INDIRECT_COST_ERROR,
                    error: error.response.data.error.message
                });
                //errorHandler(dispatch, error.response, FETCHING_APPOITMENTS_ERROR)
            });
        })
        .catch((error) => {
            //console.log(error);
            dispatch({
                type: DELETING_PROJECT_INDIRECT_COST_CHILDREN_ERROR,
                error: error.response.data.error.message
            });
            //errorHandler(dispatch, error.response, FETCHING_APPOITMENTS_ERROR)
        });
    };
