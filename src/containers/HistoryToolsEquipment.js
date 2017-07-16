import { connect } from 'react-redux';
import HistoryTools from '../components/HistoryToolsEquipment';
import {FetchTools,ReportCostHistorToolsAndEquipment} from '../actions/HistoryReports';

const mapStateToProps = (state) => {
    return {
        entityId: state.account.entityId,
        Tools: state.historyTools.listToolEquipment,
        ToolsHistory: state.historyTools.listToolEquipmentCostHistory,

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
        }
    };
};



export default connect(mapStateToProps, mapDispatchToProps)(HistoryTools);