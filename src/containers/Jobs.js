import { connect } from 'react-redux';
import Jobs from '../components/Jobs';
import {FetchJobs,AddJob,EditJob,DeleteJob} from '../actions/jobActions';

const mapStateToProps = (state) => {
    return {
        entityId: state.account.entityId,
        jobs: state.jobs.list,
        isSaving: state.jobs.isSaving,
        loading: state.jobs.loading
    };
};


const mapDispatchToProps = (dispatch) => {
    return {
        FetchJobs: () => {
            dispatch(FetchJobs());
        },
        AddJob: (params) => {
            dispatch(AddJob(params));
        },
        EditJob: (id,params) => {
            dispatch(EditJob(id,params));
        },
        DeleteJob: (id) => {
            dispatch(DeleteJob(id));
        }
    };
};



export default connect(mapStateToProps, mapDispatchToProps)(Jobs);