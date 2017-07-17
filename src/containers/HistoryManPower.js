import { connect } from 'react-redux';
import HistoryManPower from '../components/HistoryManPower';
import {FetchManPowers,ReportCostHistoryManPower,ReportCostHistoryManPowerData} from '../actions/HistoryReportsActions';

const mapStateToProps = (state) => {
    return {
        entityId: state.account.entityId,
        ManPowers: state.historyManPower.listManPower,
        ManPowersHistory: state.historyManPower.listManPowerCostHistory,
        ManPowersHistoryData: state.historyManPower.listManPowerCostHistoryData,

        loadingManPower: state.historyManPower.loadingManPower,
        loadingManPowerCostHistory: state.historyManPower.loadingManPowerCostHistory,
    };
};


const mapDispatchToProps = (dispatch) => {
    return {
        FetchManPowers: (entityId) => {
            dispatch(FetchManPowers(entityId));
        },
        ReportCostHistoryManPower: (manPowerId) => {
            dispatch(ReportCostHistoryManPower(manPowerId));
        },
        ReportCostHistoryManPowerData: (manPowerId) => {
            dispatch(ReportCostHistoryManPowerData(manPowerId));
        }
    };
};



export default connect(mapStateToProps, mapDispatchToProps)(HistoryManPower);