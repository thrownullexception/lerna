import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { AppLayout, AuthLayout } from '../layouts';
import { IMenuItems } from './types';
import { FaqRoutes } from '../screens/Faqs';
import { NotFound } from '../screens/NotFound';
import { Dashboard } from '../screens/Dashboard';
import { authenticationGuard } from '../guards';
import { SkillsRoutes } from '../screens/Skills';

export const appRoutes: IMenuItems[] = [
  {
    path: '/',
    exact: true,
    title: 'Dashboard',
    component: authenticationGuard(Dashboard),
    showOnNavigation: true,
  },
  ...FaqRoutes,
  ...SkillsRoutes,
  {
    path: '*',
    title: 'Not Found',
    component: NotFound,
  },
];

export const route = (
  <Switch>
    <Route path="/auth" component={AuthLayout} />
    <Route path="/" component={AppLayout} />
  </Switch>
);
