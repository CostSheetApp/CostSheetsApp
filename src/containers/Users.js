import { connect } from 'react-redux';
import Users from '../components/Users';
import {FetchUsers,AddUser,EditUser} from '../actions/usersActions';

const mapStateToProps = (state) => {
    return {
        entityId: state.account.entityId,
        users: state.users.list,
        isSaving: state.users.isSaving
    };
};


const mapDispatchToProps = (dispatch) => {
    return {
        FetchUsers: (entityId) => {
            dispatch(FetchUsers(entityId));
        },
        AddUser: (entityId,params) => {
            dispatch(AddUser(entityId,params));
        },
        EditUser: (id,name) => {
            dispatch(EditUser(id,name));
        }
    };
};



export default connect(mapStateToProps, mapDispatchToProps)(Users);