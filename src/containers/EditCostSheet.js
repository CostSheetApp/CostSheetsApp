import { connect } from 'react-redux';
import CostSheetForm from '../components/CostSheetForm';
import {FetchCostSheet} from '../actions/costSheetActions';

const mapStateToProps = (state, ownProps) => {
    return {
        costSheet: state.costSheets.toEdit
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        FetchCostSheet: (id) => {
            dispatch(FetchCostSheet(id));
        }
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(CostSheetForm);