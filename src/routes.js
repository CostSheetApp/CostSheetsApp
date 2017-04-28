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
    </Route>
    <Route path="/" component={UserIsAuthenticated(MainLayout)}>
      <IndexRoute component={Dashboard}/>
      <Route path="dashboard" component={Dashboard}/>
      <Route path="fuel-savings" component={FuelSavingsPage}/>
    </Route>
    <Route path="*" component={NotFoundPage}/>
  </Route>
);
