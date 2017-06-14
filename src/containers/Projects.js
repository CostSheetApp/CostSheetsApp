import { connect } from 'react-redux';
import Projects from '../components/Projects';
import {FetchProjects,AddProject,EditProject,DeleteProject,ViewProject} from '../actions/projectActions';

const mapStateToProps = (state) => {
    return {
        entityId: state.account.entityId,
        projects: state.projects.list,
        isSaving: state.projects.isSaving,
        loading: state.projects.loading
    };
};


const mapDispatchToProps = (dispatch) => {
    return {
        FetchProjects: (entityId) => {
            dispatch(FetchProjects(entityId));
        },
        AddProject: (entityId,params) => {
            dispatch(AddProject(entityId,params));
        },
        EditProject: (id,params) => {
            dispatch(EditProject(id,params));
        },
        DeleteProject: (id) => {
            dispatch(DeleteProject(id));
        },
        ViewProject: (id) => {
            dispatch(ViewProject(id));
        }
    };
};



export default connect(mapStateToProps, mapDispatchToProps)(Projects);