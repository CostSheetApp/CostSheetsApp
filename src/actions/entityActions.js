import axios from 'axios';
//import cookie from 'react-cookie';
import {API_URL} from '../constants/global';
import {push} from 'react-router-redux';
import {ENTITY_REGISTER_ERROR} from '../constants/actionTypes';

  
  export const Register = ({name,username,email,password}) =>
    (dispatch) => {
        axios.post(`${API_URL}/entities`, {name,username,email,password})
        .then(() => {
            dispatch(push("/login"));
        })
        .catch((error) => {
            dispatch({
                type: ENTITY_REGISTER_ERROR,
                error: error.response.data.error.message
            });
        });
    };