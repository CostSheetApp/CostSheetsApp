import { connect } from 'react-redux';
import CostSheetForm from '../components/CostSheetForm';
import {
FetchCostSheet,
FetchCostSheetMaterials,
FetchCostSheetManpower,
FetchCostSheetToolsAndEquipment,
SelectMaterialToBeAddToCostSheet
} from '../actions/costSheetActions';

const mapStateToProps = (state) => {
    return {
        costSheet: state.costSheets.toEdit,
        csmaterials: state.costSheets.materialsToEdit,
        csmanpower: state.costSheets.manpowersToEdit,
        cstoolsAndEquipment: state.costSheets.toolsAndEquipmentsToEdit,
        Regions: state.regions.list,
        materials: state.materials.list,
        manpowers: state.manPowers.list,
        toolsAndEquipments: state.tools.list
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        FetchCostSheet: (id) => {
            dispatch(FetchCostSheet(id));
        },
        FetchCostSheetMaterials: (id) => {
            dispatch(FetchCostSheetMaterials(id));
        },
        FetchCostSheetManpower: (id) => {
            dispatch(FetchCostSheetManpower(id));
        },
        FetchCostSheetToolsAndEquipment: (id) => {
            dispatch(FetchCostSheetToolsAndEquipment(id));
        },
        SelectMaterialToBeAddToCostSheet: (id) => {
            dispatch(SelectMaterialToBeAddToCostSheet(id));
        }
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(CostSheetForm);