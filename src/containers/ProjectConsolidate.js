import { connect } from 'react-redux';
import Consolidate from '../components/ProjectConsolidate';
import {FetchProjects,FetchConsolidateMaterial,FetchConsolidateManPower,FetchConsolidateToolsAndEquipment,SelectProject,FetchConsolidateIndirectCost} from '../actions/consolidateActions';

const mapStateToProps = (state) => {
    return {
        entityId: state.account.entityId,
        Projects: state.consolidate.listProject,
        Materials: state.consolidate.listMaterial,
        ManPowers: state.consolidate.listManPower,
        ToolEquipments: state.consolidate.listToolEquipment,
        IndrectCost: state.consolidate.listIndrectCost,

        loadingProject: state.consolidate.loadingProject,
        loadingMaterial: state.consolidate.loadingMaterial,
        loadingManPower: state.consolidate.loadingManPower,
        loadingToolEquipment: state.consolidate.loadingToolEquipment,
        loadingIndirectCost: state.consolidate.loadingIndirectCost,

        project: state.consolidate.project
    };
};


const mapDispatchToProps = (dispatch) => {
    return {
        FetchProjects: (entityId,idProject) => {
            dispatch(FetchProjects(entityId,idProject));
        },
        FetchConsolidateMaterial: (projectId) => {
            dispatch(FetchConsolidateMaterial(projectId));
        },
        FetchConsolidateManPower: (projectId) => {
            dispatch(FetchConsolidateManPower(projectId));
        },
        FetchConsolidateToolsAndEquipment: (projectId) => {
            dispatch(FetchConsolidateToolsAndEquipment(projectId));
        },
        SelectProject: (project) => {
            dispatch(SelectProject(project));
        },
        FetchConsolidateIndirectCost: (projectId) => {
            dispatch(FetchConsolidateIndirectCost(projectId));
        }
    };
};



export default connect(mapStateToProps, mapDispatchToProps)(Consolidate);