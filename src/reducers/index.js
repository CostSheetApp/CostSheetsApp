import { combineReducers } from 'redux';
import fuelSavings from './fuelSavingsReducer';
import {routerReducer} from 'react-router-redux';
import accountReducer from './accountReducer';
import regionsReducer from './regionsReducer';
import materialsReducer from './materialsReducer';

const rootReducer = combineReducers({
  fuelSavings,
  routing: routerReducer,
  account: accountReducer,
  regions: regionsReducer,
  materials: materialsReducer
});

export default rootReducer;
