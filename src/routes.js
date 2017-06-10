import React from 'react';
import { Route, IndexRoute } from 'react-router';
import {routerActions} from 'react-router-redux';
import {UserAuthWrapper} from 'redux-auth-wrapper';

//layouts
import MainLayout from './layouts/MainLayout';
import EmpyLayout from './layouts/EmptyLayout';

import App from './components/App';
import HomePage from './components/HomePage';
import FuelSavingsPage from './containers/FuelSavingsPage'; // eslint-disable-line import/no-named-as-default
import AboutPage from './components/AboutPage';
import NotFoundPage from './components/NotFoundPage';
import Login from './containers/Login';
import Dashboard from './containers/Dashboard';
import ForgotPassword from './components/ForgotPassword';
import CostSheets from './containers/CostSheets';
import EditCostSheet from './containers/EditCostSheet';
import Projects from './containers/Projects';
import Users from './containers/Users';
import ResetPassword from './components/ResetPassword';
import RegisterForm from './components/RegisterForm';
import Materiasl from './containers/Materials';

import Regions from './containers/Regions';
import DashboardProject from './containers/DashboardProject';
import ToolsEquipments from './containers/ToolsEquipments';


const UserIsNotAuthenticated = UserAuthWrapper({
  authSelector: state => state.account,
  redirectAction: routerActions.replace,
  wrapperDisplayName: 'UserIsNotAuthenticated',
  // Want to redirect the user when they are done loading and authenticated
  predicate: account => !account.isAuthenticated,
  failureRedirectPath: (state, ownProps) => ownProps.location.query.redirect || '/',
  allowRedirectBack: false
});

const UserIsAuthenticated = UserAuthWrapper({
  authSelector: state => state.account.isAuthenticated
    ? state.account
    : {},
  authenticatingSelector: state => state.account.isLoading,
  //LoadingComponent: loading,
  redirectAction: routerActions.replace,
  wrapperDisplayName: 'UserIsAuthenticated'
});


export default (
  <Route>
    <Route component={EmpyLayout}>
      <Route path="login" component={UserIsNotAuthenticated(Login)}/>
      <Route path="forgot-password" component={ForgotPassword}></Route>
      <Route path="reset-password" component={ResetPassword}></Route>
      <Route path="register-user" component={UserIsNotAuthenticated(RegisterForm)}></Route>
    </Route>
    <Route path="/" component={UserIsAuthenticated(MainLayout)}>
      <IndexRoute component={Dashboard}/>
      <Route path="dashboard" component={Dashboard}/>
      <Route path="cost-sheets" component={CostSheets}/>
      <Route path="cost-sheets/:id" component={EditCostSheet}/>
      <Route path="projects" component={Projects}/>
      <Route path="regions" component={Regions}/> 
      <Route path="materials" component={Materiasl}/>      
      <Route path="users" component={Users}/>
      <Route path="dashboard-project" component={DashboardProject}/>
      <Route path="tools-equipments" component={ToolsEquipments}/>
      <Route path="fuel-savings" component={FuelSavingsPage}/>
    </Route>
    <Route path="*" component={NotFoundPage}/>
  </Route>
);
