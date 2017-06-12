import axios from 'axios';
import cookie from 'react-cookie';
import {API_URL} from '../constants/global';
import {push} from 'react-router-redux';
import {ACCOUNT_LOGIN,ACCOUNT_LOGOUT,AUTHORIZED_ACCOUNT,UNAUTHORIZED_ACCOUNT,EMAIL_NOT_FOUND,RESET_PASSWORD_ERROR} from '../constants/actionTypes';



export const Login = ({username, password}) =>
    (dispatch) => {
        dispatch({type: ACCOUNT_LOGIN});

        axios.post(`${API_URL}/accounts/login?include=user`, {username, password})
        .then(response => {
            cookie.save('token', response.data.id, {path: '/'});
            // dispatch({type: AUTH_LOADING})

            setTimeout(() => {
            dispatch({
                type: AUTHORIZED_ACCOUNT,
                username: response.data.user.name,
                entityId: response.data.user.entityId
            });
            }, 2000);
        })
        .catch((error) => {
            dispatch({
                type: UNAUTHORIZED_ACCOUNT,
                error: error.response.data.error.message
            });
        });
    };

export const Logout = () =>
    (dispatch) => {
        dispatch({ type: ACCOUNT_LOGOUT });
        axios.post(`${API_URL}/accounts/logout?access_token=${cookie.load('token')}`)
        .then(()=> {
            cookie.remove('token');
        })
        .catch((error) => {
            dispatch({
                type: UNAUTHORIZED_ACCOUNT,
                error: error.response.data.error.message
            });
        });
    };



export const ForgotPassword = ({email}) =>
    (dispatch) => {
        axios.post(`${API_URL}/accounts/reset`, {email})
        .then(() => {
            dispatch(push("/login"));
        })
        .catch((error) => {
            dispatch({
                type: EMAIL_NOT_FOUND,
                error: error.response.data.error.message
            });
        });
    };

export const ResetPassword = ({access_token,password, confirmPassword}) =>
    (dispatch) => {
        axios.post(`${API_URL}/accounts/reset-password`, {access_token,password, confirmPassword})
        .then(() => {
            dispatch(push("/login"));
        })
        .catch((error) => {
            dispatch({
                type: RESET_PASSWORD_ERROR,
                error: error.response.data.error.message
            });
        });
    };


