import { connect } from 'react-redux';
import Regions from '../components/Regions';
import {FetchRegions,AddRegion,EditRegion} from '../actions/regionActions';
//import {EditRegion} from '../actions/regionActions';
//import * as courseActions from '../../actions/catActions';  

const mapStateToProps = (state) => {
    return {
        regions: state.regions.list,
        isSaving: state.regions.isSaving
    };
};


const mapDispatchToProps = (dispatch) => {
    return {
        FetchRegions: () => {
            dispatch(FetchRegions());
        },
        AddRegion: (name) => {
            dispatch(AddRegion(name));
        },
        EditRegion: (id,name) => {
            dispatch(EditRegion(id,name));
        }
    };
};



export default connect(mapStateToProps, mapDispatchToProps)(Regions);