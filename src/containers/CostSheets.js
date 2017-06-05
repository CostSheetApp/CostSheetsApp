import { connect } from 'react-redux';
import CostSheets from '../components/CostSheets';
import {AddCostSheet} from '../actions/costSheetActions';

const mapStateToProps = (state, ownProps) => {
    return {
        entityId: state.account.entityId,
        costSheets: state.costSheets.list
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        AddCostSheet: (entityId) => {
            dispatch(AddCostSheet(entityId));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CostSheets);