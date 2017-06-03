import { combineReducers } from 'redux';
import fuelSavings from './fuelSavingsReducer';
import {routerReducer} from 'react-router-redux';
import accountReducer from './accountReducer';
import regionsReducer from './regionsReducer';
import usersReducer from './usersReducer';
import materialsReducer from './materialsReducer';

const rootReducer = combineReducers({
  fuelSavings,
  routing: routerReducer,
  account: accountReducer,
  regions: regionsReducer,
  users: usersReducer
  materials: materialsReducer
});

export default rootReducer;
