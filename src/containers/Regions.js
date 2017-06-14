import { connect } from 'react-redux';
import Regions from '../components/Regions';
import {FetchRegions,AddRegion,EditRegion,DeleteRegion} from '../actions/regionActions';
//import {EditRegion} from '../actions/regionActions';
//import * as courseActions from '../../actions/catActions';  

const mapStateToProps = (state) => {
    return {
        entityId: state.account.entityId,
        regions: state.regions.list,
        isSaving: state.regions.isSaving,
        loading: state.regions.loading
    };
};


const mapDispatchToProps = (dispatch) => {
    return {
        FetchRegions: (entityId) => {
            dispatch(FetchRegions(entityId));
        },
        AddRegion: (entityId,params) => {
            dispatch(AddRegion(entityId,params));
        },
        EditRegion: (id,params) => {
            dispatch(EditRegion(id,params));
        },
        DeleteRegion: (id) => {
            dispatch(DeleteRegion(id));
        }
    };
};



export default connect(mapStateToProps, mapDispatchToProps)(Regions);