import React from 'react';
import classnames from 'classnames';
import { useLocation } from 'react-router';
import { routes } from '../../../routes/routes';
import { IMenuItems } from '../../../routes/types';
import { NavigationService } from '../../../services';

interface INavigationMenu {
  permissions: string[];
  role: string;
}

const buildMenu: React.SFC<IMenuItems> = ({ path, title }, pathname: string): JSX.Element => {
  const navClassName = classnames({
    'dt-side-nav__link': true,
    'dt-side-nav__link--active': pathname === path,
  });
  return (
    <li key={title} className="dt-side-nav__item">
      <a href={NavigationService.hash(`${path}`)} className={navClassName} title={title}>
        <i className="fa fa-bars" />
        <span className="dt-side-nav__text">{title}</span>
      </a>
    </li>
  );
};

export const NavigationMenu: React.SFC<INavigationMenu> = ({
  permissions,
  role,
}): JSX.Element | null => {
  const location = useLocation();
  if (!permissions) {
    return null;
  }
  return (
    <ul className="dt-side-nav">
      <li className="dt-side-nav__item dt-side-nav__header">
        <span className="dt-side-nav__text">main</span>
      </li>
      {routes
        .filter(
          route =>
            route.showOnNavigation &&
            (!route.permission ||
              permissions.includes('' + route.permission) ||
              role === 'SUPER_ADMIN'),
        )
        .map(route => buildMenu(route, location.pathname))}
    </ul>
  );
};
