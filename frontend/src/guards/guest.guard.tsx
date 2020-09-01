import React from 'react';
import { connect, ConnectedComponent } from 'react-redux';
import { Redirect } from 'react-router';
import { IStore } from '../store/rootReducers';
import { AuthSelectors } from '../app/auth/auth.selectors';

interface IProps {
  isAuthenticated: boolean;
}

interface InjectedProps extends IProps {
  location: Location;
}

export function guestGuard(
  Component: React.ComponentType | ConnectedComponent<any, {}>,
): React.ComponentType {
  class AuthenticatedComponent extends React.PureComponent<IProps> {
    get injected() {
      return this.props as InjectedProps;
    }
    render() {
      if (this.props.isAuthenticated) {
        return <Redirect to="/" />;
      }
      return <Component {...this.props} />;
    }
  }

  return connect((state: IStore) => ({
    isAuthenticated: AuthSelectors.selectIsAuthenticated(state),
  }))(AuthenticatedComponent) as React.ComponentType;
}
