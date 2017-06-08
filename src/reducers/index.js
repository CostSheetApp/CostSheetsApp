import { combineReducers } from 'redux';
import fuelSavings from './fuelSavingsReducer';
import {routerReducer} from 'react-router-redux';
import accountReducer from './accountReducer';
import regionsReducer from './regionsReducer';
import usersReducer from './usersReducer';
import materialsReducer from './materialsReducer';
import entityReducer from './entityReducer';
import costSheetsReducer from './costSheetsReducer';
import projectReducer from './projectsReducer';
import toolReducer from './toolsReducer';
import manPowerReducer from './manPowersReducer';

const rootReducer = combineReducers({
  fuelSavings,
  routing: routerReducer,
  account: accountReducer,
  regions: regionsReducer,
  materials: materialsReducer,
  entity: entityReducer,
  users: usersReducer,
  costSheets: costSheetsReducer,
  projects: projectReducer,
  tools: toolReducer,
  manPowers: manPowerReducer
});

export default rootReducer;
