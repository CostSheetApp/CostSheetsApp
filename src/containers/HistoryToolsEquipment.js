import { connect } from 'react-redux';
import HistoryTools from '../components/HistoryToolsEquipment';
import {FetchTools,ReportCostHistorToolsAndEquipment,ReportCostHistorToolsAndEquipmentData} from '../actions/HistoryReportsActions';

const mapStateToProps = (state) => {
    return {
        entityId: state.account.entityId,
        Tools: state.historyTools.listToolEquipment,
        CharData: state.historyTools.CharData,
        ToolsHistoryData: state.historyTools.listToolEquipmentCostHistoryData,

        loadingToolEquipment: state.historyTools.loadingToolEquipment,
        loadingToolEquipmentCostHistory: state.historyTools.loadingToolEquipmentCostHistory,
    };
};


const mapDispatchToProps = (dispatch) => {
    return {
        FetchTools: (entityId) => {
            dispatch(FetchTools(entityId));
        },
        ReportCostHistorToolsAndEquipment: (toolsAndEquipmentId) => {
            dispatch(ReportCostHistorToolsAndEquipment(toolsAndEquipmentId));
        },
        ReportCostHistorToolsAndEquipmentData: (toolsAndEquipmentId) => {
            dispatch(ReportCostHistorToolsAndEquipmentData(toolsAndEquipmentId));
        }
    };
};



export default connect(mapStateToProps, mapDispatchToProps)(HistoryTools);