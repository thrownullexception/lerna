import { RouteConfig } from 'react-router-config';
import { AccountModeType } from '../app/auth/auth.types';

interface IMenuAction {
  title: string;
  path: string;
}

export interface IMenuItems extends RouteConfig {
  title: string;
  permission?: string;
  showOnNavigation?: boolean;
  accountModes?: AccountModeType[];
  actions?: IMenuAction[];
}
