import {connect} from 'react-redux';
import ToolsEquipments from '../components/ToolsEquipments';
import {FetchTools, FetchToolCostHistory, AddTool, UpdateTool, DeleteTool} from '../actions/toolsActions';

const mapStateToProps = (state) => {
return {
    entityId: state.account.entityId,
    toolsEquipments: state.tools.list, 
    costHistory: state.tools.CostHistory, 
    loading: state.tools.loading,
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
        },
        DeleteTool: (id) => {
            dispatch(DeleteTool(id));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ToolsEquipments);