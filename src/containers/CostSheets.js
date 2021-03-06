import { connect } from 'react-redux';
import CostSheets from '../components/CostSheets';
import {AddCostSheet,FetchCostSheets,ViewCostSheet} from '../actions/costSheetActions';

const mapStateToProps = (state) => {
    return {
        entityId: state.account.entityId,
        costSheets: state.costSheets.list
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        FetchCostSheets: (entityId) => {
            dispatch(FetchCostSheets(entityId));
        },
        AddCostSheet: (entityId) => {
            dispatch(AddCostSheet(entityId));
        },
        ViewCostSheet: (id) => {
            dispatch(ViewCostSheet(id));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CostSheets);