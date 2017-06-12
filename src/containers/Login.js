import { connect } from 'react-redux';
import LoginForm from '../components/LoginForm';
import {Login} from '../actions/accountActions';

const mapStateToProps = (state) => {
    return {
        hasError: state.account.hasError,
        error: state.account.error
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        login: (username,password) => {
            dispatch(Login(username,password));
        },
        dispatch
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);