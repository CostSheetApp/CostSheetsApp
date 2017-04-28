import axios from 'axios';
import cookie from 'react-cookie';
import {ACCOUNT_LOGIN,ACCOUNT_LOGOUT,AUTHORIZED_ACCOUNT,UNAUTHORIZED_ACCOUNT,EMAIL_NOT_FOUND,RESET_PASSWORD_ERROR,ACCOUNT_REGISTER,ACCOUNT_REGISTER_ERROR} from '../constants/actionTypes';
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

export const Logout = () =>
    (dispatch, getState) => {
        axios.post(`${API_URL}/accounts/logout`, {},{
        headers: {'Authorization': cookie.load('token')}
        })
        .then(response => {
            cookie.remove('token');
            dispatch({
                type: ACCOUNT_LOGOUT
            })
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
            dispatch({type: ACCOUNT_LOGIN})
            window.location.href =  '/login';
        })
        .catch((error) => {
            dispatch({
                type: EMAIL_NOT_FOUND,
                error: error.response.data.error.message
            })
        });
    }

export const ResetPassword = ({access_token,password, confirmPassword}) =>
    (dispatch, getState) => {
        axios.post(`${API_URL}/accounts/reset-password`, {access_token,password, confirmPassword})
        .then(response => {
            window.location.href =  '/login';
        })
        .catch((error) => {
            dispatch({
                type: RESET_PASSWORD_ERROR,
                error: error.response.data.error.message
            })
        });
    }

  export const Register = ({name,username,email,password}) =>
    (dispatch, getState) => {
        axios.post(`${API_URL}/accounts`, {name,username,email,password})
        .then(response => {
            
             dispatch({
                type: ACCOUNT_REGISTER
            })

            window.location.href =  '/login';
        })
        .catch((error) => {
            dispatch({
                type: ACCOUNT_REGISTER_ERROR,
                error: error.response.data.error.message
            })
        });
    }
