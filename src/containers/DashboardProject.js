import { connect } from 'react-redux';
import ProjectCostSheet from '../components/DashboardProject';
import {FetchProjectsCostSheet,ViewCostSheet} from '../actions/projectCostSheetActions';

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
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectCostSheet);