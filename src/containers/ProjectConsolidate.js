import { connect } from 'react-redux';
import Consolidate from '../components/ProjectConsolidate';
import {FetchProjects,FetchConsolidateMaterial,FetchConsolidateManPower,FetchConsolidateToolsAndEquipment} from '../actions/consolidateActions';

const mapStateToProps = (state) => {
    return {
        entityId: state.account.entityId,
        Projects: state.consolidate.listProject,
        Materials: state.consolidate.listMaterial,
        ManPowers: state.consolidate.listManPower,
        ToolEquipments: state.consolidate.listToolEquipment,

        loadingProject: state.consolidate.loadingProject,
        loadingMaterial: state.consolidate.loadingMaterial,
        loadingManPower: state.consolidate.loadingManPower,
        loadingToolEquipment: state.consolidate.loadingToolEquipment
    };
};


const mapDispatchToProps = (dispatch) => {
    return {
        FetchProjects: (entityId) => {
            dispatch(FetchProjects(entityId));
        },
        FetchConsolidateMaterial: (projectId) => {
            dispatch(FetchConsolidateMaterial(projectId));
        },
        FetchConsolidateManPower: (projectId) => {
            dispatch(FetchConsolidateManPower(projectId));
        },
        FetchConsolidateToolsAndEquipment: (projectId) => {
            dispatch(FetchConsolidateToolsAndEquipment(projectId));
        }
    };
};



export default connect(mapStateToProps, mapDispatchToProps)(Consolidate);