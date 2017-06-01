import { connect } from 'react-redux';
import Materials from '../components/Materials';
import {FetchMaterials,FetchMaterialCostHistory,FetchUnitsOfMeasurement,AddMaterial,UpdateMaterial} from '../actions/materialsActions';

const mapStateToProps = (state) => {
    return {
        materials: state.materials.list,
        costHistory: state.materials.CostHistory,
        isSaving: state.materials.isSaving,
        UnitsOfMeasurement: state.materials.UnitsOfMeasurement
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        FetchMaterials: () => {
            dispatch(FetchMaterials());
        },
        FetchMaterialCostHistory: (id) => {
            dispatch(FetchMaterialCostHistory(id));
        },
        FetchUnitsOfMeasurement: () => {
            dispatch(FetchUnitsOfMeasurement());
        },
        AddMaterial: (values) => {
            dispatch(AddMaterial(values));
        },
        UpdateMaterial: (id,values) => {
            dispatch(UpdateMaterial(id,values));
        }
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Materials);