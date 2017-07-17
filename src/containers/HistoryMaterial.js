import { connect } from 'react-redux';
import HistoryMaterial from '../components/HistoryMaterial';
import {FetchMaterials,ReportCostHistoryMaterial,ReportCostHistoryMaterialData} from '../actions/HistoryReportsActions';

const mapStateToProps = (state) => {
    return {
        entityId: state.account.entityId,
        Materials: state.historyMaterial.listMaterial,
        CharData: state.historyMaterial.CharData,
        MaterialsHistoryData: state.historyMaterial.listMaterialCostHistoryData,

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
        },
        ReportCostHistoryMaterialData: (materialId) => {
            dispatch(ReportCostHistoryMaterialData(materialId));
        }
    };
};



export default connect(mapStateToProps, mapDispatchToProps)(HistoryMaterial);