import {ACCOUNT_LOGIN,ACCOUNT_LOGOUT,UNAUTHORIZED_ACCOUNT} from '../constants/actionTypes';
import {API_URL} from '../constants/global'
import axios from 'axios';
import cookie from 'react-cookie';

export const Login = (username,password) =>
    (dispatch, getState) => {
        axios.post(`${API_URL}/accounts/login`, {username, password})
        .then(response => {
            cookie.save('token', response.data.id, {path: '/'});
            // dispatch({type: AUTH_LOADING})

            // setTimeout(() => {
            // dispatch({type: AUTH_USER});
            // }, 2000)
            console.log(response);
            //window.location.href =  '/dashboard';
        })
        .catch((error) => {
            dispatch({
                type: UNAUTHORIZED_ACCOUNT,
                error: error.response
            })
        });
    }
