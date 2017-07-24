import { connect } from 'react-redux';
import ProjectCostSheet from '../components/DashboardProject';
import {FetchProjectsCostSheet,ViewCostSheet} from '../actions/projectCostSheetActions';
import {FetchIndirectCosts} from '../actions/projectActions';
const mapStateToProps = (state) => {
    return {
        entityId: state.account.entityId,
        costSheets: state.projectCostSheet.list,
        loading: state.projectCostSheet.loading
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        FetchProjectsCostSheet: (idProject) => {
            dispatch(FetchProjectsCostSheet(idProject));
        },
        ViewCostSheet: (id) => {
            dispatch(ViewCostSheet(id));
        },
        FetchIndirectCosts: (projectId) => {
            dispatch(FetchIndirectCosts(projectId))
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectCostSheet);