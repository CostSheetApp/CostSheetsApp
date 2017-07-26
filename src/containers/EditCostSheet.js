import { connect } from 'react-redux';
import CostSheetForm from '../components/CostSheetForm';
import {
FetchCostSheet,
FetchCostSheetMaterials,
FetchCostSheetManpower,
FetchCostSheetToolsAndEquipment,
SelectMaterialToBeAddToCostSheet,
AddMaterial,
AddManPower,
AddToolsAndEquipment,
FetchSumSheetMaterials,
FetchSumSheetManpower,
FetchSumSheetToolsAndEquipment,
DeleteDetailMaterial,
DeleteDetailManPower,
DeleteDetailToolEquipment,
UpdateCostSheets,
EditMaterial,
EditManPower,
EditToolEquipment
} from '../actions/costSheetActions';

import {FetchUnitsOfMeasurement} from '../actions/materialsActions';

const mapStateToProps = (state) => {
    return {
        costSheet: state.costSheets.toEdit,
        materialToBeAddToCostSheet: state.costSheets.materialToBeAddToCostSheet,
        csmaterials: state.costSheets.materialsToEdit,
        csmanpower: state.costSheets.manpowersToEdit,
        cstoolsAndEquipment: state.costSheets.toolsAndEquipmentsToEdit,
        Regions: state.regions.list,
        materials: state.materials.list,
        manpowers: state.manPowers.list,
        toolsAndEquipments: state.tools.list,
        UnitsOfMeasurement: state.materials.UnitsOfMeasurement,

        totalMaterials: state.costSheets.SumMaterial,
        totalManPowers: state.costSheets.SumManPower,
        totalTools: state.costSheets.SumToolAndEquipment
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
        },
        AddMaterial: (costSheetId,params) => {
            dispatch(AddMaterial(costSheetId,params));
        },
        AddManPower: (costSheetId,params) => {
            dispatch(AddManPower(costSheetId,params));
        },
        AddToolsAndEquipment: (costSheetId,params) => {
            dispatch(AddToolsAndEquipment(costSheetId,params));
        },
        FetchSumSheetMaterials: (id) => {
            dispatch(FetchSumSheetMaterials(id));
        },
        FetchSumSheetManpower: (id) => {
            dispatch(FetchSumSheetManpower(id));
        },
        FetchSumSheetToolsAndEquipment: (id) => {
            dispatch(FetchSumSheetToolsAndEquipment(id));
        },
        DeleteDetailMaterial: (costSheetId, id) => {
            dispatch(DeleteDetailMaterial(costSheetId, id));
        },
        DeleteDetailManPower: (costSheetId, id) => {
            dispatch(DeleteDetailManPower(costSheetId, id));
        },
        DeleteDetailToolEquipment: (costSheetId, id) => {
            dispatch(DeleteDetailToolEquipment(costSheetId, id));
        },
        FetchUnitsOfMeasurement: () => {
            dispatch(FetchUnitsOfMeasurement());
        },
        UpdateCostSheets: (costSheetId, values) => {
            dispatch(UpdateCostSheets(costSheetId, values));
        },
        EditMaterial: (id, costSheetId, values) => {
            dispatch(EditMaterial(id, costSheetId, values));
        },
        EditManPower: (id, costSheetId, values) => {
            dispatch(EditManPower(id, costSheetId, values));
        },
        EditToolEquipment: (id, costSheetId, values) => {
            dispatch(EditToolEquipment(id, costSheetId, values));
        }
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(CostSheetForm);