import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { RouteConfig } from 'react-router-config';
import { AppLayout, AuthLayout } from '../layouts';
import { FaqRoutes } from '../screens/Faqs';
import { NotFound } from '../screens/NotFound';
import { Dashboard } from '../screens/Dashboard';
import { SignIn, SignInPath } from '../screens/SignIn';
import { requireAuthentication } from './guards/requireAuthentication';
import { NavigationService } from '../services';
import { IMenuItems } from './types';

export const appRoutes: IMenuItems[] = [
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

export const authRoutes: RouteConfig[] = [
  {
    path: NavigationService.indexPath(SignInPath),
    exact: true,
    component: SignIn as React.ComponentType,
  },
];

export const route = (
  <Switch>
    <Route path="/auth" component={AuthLayout} />
    <Route path="/" component={AppLayout} />
  </Switch>
);
