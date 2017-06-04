import { connect } from 'react-redux';
import Users from '../components/Users';
import {FetchUsers,AddUser,EditUser} from '../actions/usersActions';

const mapStateToProps = (state) => {
    return {
        users: state.users.list,
        isSaving: state.users.isSaving
    };
};


const mapDispatchToProps = (dispatch) => {
    return {
        FetchUsers: () => {
            dispatch(FetchUsers());
        },
        AddUser: (name) => {
            dispatch(AddUser(name));
        },
        EditUser: (id,name) => {
            dispatch(EditUser(id,name));
        }
    };
};



export default connect(mapStateToProps, mapDispatchToProps)(Users);