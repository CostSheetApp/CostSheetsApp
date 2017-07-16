import { connect } from 'react-redux';
import HistoryMaterial from '../components/HistoryMaterial';
import {FetchMaterials,ReportCostHistoryMaterial} from '../actions/HistoryReports';

const mapStateToProps = (state) => {
    return {
        entityId: state.account.entityId,
        Materials: state.historyMaterial.listMaterial,
        MaterialsHistory: state.historyMaterial.listMaterialCostHistory,

        loadingMaterial: state.historyMaterial.loadingMaterial,
        loadingMaterialCostHistory: state.historyMaterial.loadingMaterialCostHistory,
    };
};


const mapDispatchToProps = (dispatch) => {
    return {
        FetchMaterials: (entityId) => {
            dispatch(FetchMaterials(entityId));
        },
        ReportCostHistoryMaterial: (materialId) => {
            dispatch(ReportCostHistoryMaterial(materialId));
        }
    };
};



export default connect(mapStateToProps, mapDispatchToProps)(HistoryMaterial);