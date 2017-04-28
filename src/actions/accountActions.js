import axios from 'axios';
import cookie from 'react-cookie';
import {ACCOUNT_LOGIN,ACCOUNT_LOGOUT,AUTHORIZED_ACCOUNT,UNAUTHORIZED_ACCOUNT,EMAIL_NOT_FOUND} from '../constants/actionTypes';
import {API_URL} from '../constants/global';


export const Login = ({username, password}) =>
    (dispatch, getState) => {
        dispatch({type: ACCOUNT_LOGIN})

        axios.post(`${API_URL}/accounts/login?include=user`, {username, password})
        .then(response => {
            cookie.save('token', response.data.id, {path: '/'});
            // dispatch({type: AUTH_LOADING})

            setTimeout(() => {
            dispatch({
                type: AUTHORIZED_ACCOUNT,
                username: response.data.user.name
            });
            }, 2000)
            //window.location.href =  '/dashboard';
        })
        .catch((error) => {
            dispatch({
                type: UNAUTHORIZED_ACCOUNT,
                error: error.response.data.error.message
            })
        });
    }


export const ForgotPassword = ({email}) =>
    (dispatch, getState) => {
        axios.post(`${API_URL}/accounts/reset`, {email})
        .then(response => {
            window.location.href =  '/login';
        })
        .catch((error) => {
            dispatch({
                type: EMAIL_NOT_FOUND,
                error: error.response.data.error.message
            })
        });
    }

