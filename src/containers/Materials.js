import { connect } from 'react-redux';
import Materials from '../components/Materials';
import {FetchMaterials,FetchMaterialCostHistory} from '../actions/materialsActions';

const mapStateToProps = (state) => {
    return {
        materials: state.materials.list,
        costHistory: state.materials.CostHistory,
        isSaving: state.materials.isSaving
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        FetchMaterials: () => {
            dispatch(FetchMaterials());
        },
        FetchMaterialCostHistory: (id) => {
            dispatch(FetchMaterialCostHistory(id));
        }
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Materials);