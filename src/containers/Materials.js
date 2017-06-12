import {connect} from 'react-redux';
import Materials from '../components/Materials';
import {FetchMaterials, FetchMaterialCostHistory, FetchUnitsOfMeasurement, AddMaterial, UpdateMaterial, DeleteMaterial} from '../actions/materialsActions';
import {FetchRegions} from '../actions/regionActions';

const mapStateToProps = (state) => {
return {
    entityId: state.account.entityId,
    materials: state.materials.list, 
    costHistory: state.materials.CostHistory, 
    isSaving: state.materials.isSaving, 
    UnitsOfMeasurement: state.materials.UnitsOfMeasurement,
    regions: state.regions.list,

    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        FetchMaterials: (entityId) => {
            dispatch(FetchMaterials(entityId));
        },
        FetchMaterialCostHistory: (id) => {
            dispatch(FetchMaterialCostHistory(id));
        },
        FetchUnitsOfMeasurement: () => {
            dispatch(FetchUnitsOfMeasurement());
        },
        AddMaterial: (entityId,values) => {
            dispatch(AddMaterial(entityId,values));
        },
        UpdateMaterial: (id, values) => {
            dispatch(UpdateMaterial(id, values));
        },
        DeleteMaterial: (id) => {
            dispatch(DeleteMaterial(id));
        },
        FetchRegions: (entityId) => {
            dispatch(FetchRegions(entityId));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Materials);