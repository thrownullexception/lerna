import { RouteConfig } from 'react-router-config';

interface IMenuAction {
  title: string;
  path: string;
}

export interface IMenuItems extends RouteConfig {
  title: string;
  permission?: string;
  showOnNavigation?: boolean;
  actions?: IMenuAction[];
}
