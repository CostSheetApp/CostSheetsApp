import { connect } from 'react-redux';
import CostSheets from '../components/CostSheets';
import {AddCostSheet,FetchCostSheets} from '../actions/costSheetActions';

const mapStateToProps = (state, ownProps) => {
    return {
        entityId: state.account.entityId,
        costSheets: state.costSheets.list
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        FetchCostSheets: (entityId) => {
            dispatch(FetchCostSheets(entityId));
        },
        AddCostSheet: (entityId) => {
            dispatch(AddCostSheet(entityId));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CostSheets);