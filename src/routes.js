import React from 'react';
import { Route, IndexRoute } from 'react-router';

//layouts
import MainLayout from './layouts/MainLayout';
import EmpyLayout from './layouts/EmptyLayout';

import App from './components/App';
import HomePage from './components/HomePage';
import FuelSavingsPage from './containers/FuelSavingsPage'; // eslint-disable-line import/no-named-as-default
import AboutPage from './components/AboutPage';
import NotFoundPage from './components/NotFoundPage';
import Dashboard from './containers/Dashboard';

export default (
  <Route>
    <Route component={EmpyLayout}>
      <Route path="about" component={AboutPage}/>
    </Route>
    <Route path="/" component={MainLayout}>
      <IndexRoute component={Dashboard}/>
      <Route path="dashboard" component={Dashboard}/>
      <Route path="fuel-savings" component={FuelSavingsPage}/>
    </Route>
    <Route path="*" component={NotFoundPage}/>
  </Route>
);
