import {connect} from 'react-redux';
import ManPowers from '../components/ManPowers';
import {FetchManPowers, FetchManPowerCostHistory, FetchJobs, AddManPower, UpdateManPower} from '../actions/manPowersActions';

const mapStateToProps = (state) => {
return {
    entityId: state.account.entityId,
    manPowers: state.manPowers.list, 
    costHistory: state.manPowers.CostHistory, 
    isSaving: state.manPowers.isSaving,
    Jobs: state.manPowers.Jobs
  };
};

const mapDispatchToProps = (dispatch) => {
    return {
        FetchManPowers: (entityId) => {
            dispatch(FetchManPowers(entityId));
        },
        FetchManPowerCostHistory: (id) => {
            dispatch(FetchManPowerCostHistory(id));
        },
        FetchJobs: () => {
            dispatch(FetchJobs());
        },
        AddManPower: (entityId, values) => {
            dispatch(AddManPower(entityId, values));
        },
        UpdateManPower: (id, values) => {
            dispatch(UpdateManPower(id, values));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManPowers);