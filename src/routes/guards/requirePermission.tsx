import React from 'react';
import { connect, ConnectedComponent } from 'react-redux';
import { IStore } from '../../store/rootReducers';
import { Redirect } from 'react-router';

interface IProps {
  isAuthenticated: boolean;
  permissions: string[];
  role: string;
}

interface InjectedProps extends IProps {
  location: Location;
}

export function requirePermission(
  Component: React.ComponentType<any> | ConnectedComponent<any, {}>,
  permission: string,
): React.ComponentType {
  class PermissionComponent extends React.PureComponent<IProps> {
    get injected() {
      return this.props as InjectedProps;
    }
    render() {
      const { permissions, isAuthenticated, role } = this.props;
      if (!isAuthenticated) {
        const redirectAfterLogin = this.injected.location.pathname;
        return <Redirect to={`/signin?next=${redirectAfterLogin}`} />;
      }
      if (!permissions.includes(permission) && role !== 'SUPER_ADMIN') {
        return <Redirect to={`/404`} />;
      }
      return <Component {...this.props} />;
    }
  }

  const mapStateToProps = (state: IStore) => ({
    isAuthenticated: state.auth.authenticated,
    permissions: state.auth.permissions,
    role: state.auth.role,
  });

  return connect(mapStateToProps)(PermissionComponent) as React.ComponentType;
}
