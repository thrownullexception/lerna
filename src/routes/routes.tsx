import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { App as AppLayout } from '../layouts/App';
import { FaqRoutes } from '../screens/Faqs';
import { NotFound } from '../screens/NotFound';
import { Dashboard } from '../screens/Dashboard';
import { SignIn, SignInPath } from '../screens/SignIn';
import { requireAuthentication } from './guards/requireAuthentication';
import { NavigationService } from '../services';
import { IMenuItems } from './types';

export const routes: IMenuItems[] = [
  {
    path: '/',
    exact: true,
    title: 'Dashboard',
    component: requireAuthentication(Dashboard),
    showOnNavigation: true,
  },
  ...FaqRoutes,
  {
    path: '*',
    title: 'Not Found',
    component: NotFound,
  },
];

export const route = (
  <Switch>
    <Route path={NavigationService.indexPath(SignInPath)} component={SignIn} />
    <Route path="/" component={AppLayout} />
  </Switch>
);
