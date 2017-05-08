import { connect } from 'react-redux';
import Materials from '../components/Materials.js';
import {FetchMaterials,FetchMaterialCostHistory} from '../actions/materialsActions';

const mapStateToProps = (state, ownProps) => {
    return {
        materials: state.materials.list,
        material: state.materials.materialToEdit,
        costHistory: state.materials.materialCostHistory,
        isSaving: state.materials.isSaving
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        FetchMaterials: () => {
            dispatch(FetchMaterials())
        },
        FetchMaterialCostHistory: (id) => {
            dispatch(FetchMaterialCostHistory(id));
        }
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Materials);