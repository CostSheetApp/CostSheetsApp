import { connect } from 'react-redux';
import CostSheetForm from '../components/CostSheetForm';
import {
FetchCostSheet,
FetchCostSheetMaterials,
FetchCostSheetManpower,
FetchCostSheetToolsAndEquipment
} from '../actions/costSheetActions';

const mapStateToProps = (state, ownProps) => {
    return {
        costSheet: state.costSheets.toEdit,
        materials: state.costSheets.materialsToEdit,
        manpower: state.costSheets.manpowersToEdit,
        toolsAndEquipment: state.costSheets.toolsAndEquipmentsToEdit,
        Regions: state.regions.list,
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
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
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(CostSheetForm);