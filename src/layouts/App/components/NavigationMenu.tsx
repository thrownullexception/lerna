import React from 'react';
import classnames from 'classnames';
import { useLocation } from 'react-router';
import { appRoutes } from '../../../routes/routes';
import { IMenuItems } from '../../../routes/types';
import { NavigationService } from '../../../services';
import { AccountModeType } from '../../../app/auth/auth.types';

interface INavigationMenu {
  permissions: string[];
  role: string;
  accountMode: AccountModeType;
}

const buildMenu: React.SFC<IMenuItems> = ({ path, title }, pathname: string): JSX.Element => {
  const navClassName = classnames({
    'side-menu__item': true,
    active: pathname === path,
  });
  return (
    <li key={title} className="slide">
      <a href={NavigationService.hash(`${path}`)} className={navClassName} title={title}>
        <i className="side-menu__icon fe fe-airplay" />
        <span className="side-menu__label">{title}</span>
      </a>
    </li>
  );
};

export const NavigationMenu: React.SFC<INavigationMenu> = ({
  permissions,
  role,
  accountMode,
}): JSX.Element | null => {
  const { pathname } = useLocation();
  if (!permissions) {
    return null;
  }
  return (
    <ul className="side-menu">
      {appRoutes
        .filter(
          route =>
            (route.showOnNavigation &&
              route.accountModes?.includes(accountMode) &&
              !route.permission) ||
            permissions.includes('' + route.permission) ||
            role === 'SUPER_ADMIN',
        )
        .map(route => buildMenu(route, pathname))}
    </ul>
  );
};
