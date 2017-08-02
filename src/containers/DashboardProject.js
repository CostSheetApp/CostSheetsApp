import { connect } from 'react-redux';
import ProjectCostSheet from '../components/DashboardProject';
import {FetchProjectsCostSheet,ViewCostSheet,AddCostSheet} from '../actions/projectCostSheetActions';
import {FetchIndirectCosts} from '../actions/projectActions';
import {FetchCostSheets} from '../actions/costSheetActions';
import {FetchRegions} from '../actions/regionActions';
const mapStateToProps = (state) => {
    return {
        entityId: state.account.entityId,
        costSheets: state.projectCostSheet.list,
        costSheetList: state.costSheets.list,
        loading: state.projectCostSheet.loading,
        regions: state.regions.list
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
            dispatch(FetchIndirectCosts(projectId));
        },
        FetchCostSheets: (id) => {
            dispatch(FetchCostSheets(id));
        },
        FetchRegions: (id) => {
            dispatch(FetchRegions(id));
        },
        AddCostSheet: (values) => {
            dispatch(AddCostSheet(values));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectCostSheet);