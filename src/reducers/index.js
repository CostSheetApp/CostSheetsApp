import { combineReducers } from 'redux';
import fuelSavings from './fuelSavingsReducer';
import {routerReducer} from 'react-router-redux';
import accountReducer from './accountReducer';

const rootReducer = combineReducers({
  fuelSavings,
  routing: routerReducer,
  account: accountReducer
});

export default rootReducer;
