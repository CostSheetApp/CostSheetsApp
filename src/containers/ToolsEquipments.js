import {connect} from 'react-redux';
import ToolsEquipments from '../components/ToolsEquipments';
import {FetchTools, FetchToolCostHistory, AddTool, UpdateTool} from '../actions/toolsActions';

const mapStateToProps = (state) => {
return {
    entityId: state.account.entityId,
    toolsEquipments: state.tools.list, 
    costHistory: state.tools.CostHistory, 
    isSaving: state.tools.isSaving
  };
};

const mapDispatchToProps = (dispatch) => {
    return {
        FetchTools: (entityId) => {
            dispatch(FetchTools(entityId));
        },
        FetchToolCostHistory: (id) => {
            dispatch(FetchToolCostHistory(id));
        },
        AddTool: (entityId, values) => {
            dispatch(AddTool(entityId, values));
        },
        UpdateTool: (id, values) => {
            dispatch(UpdateTool(id, values));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ToolsEquipments);