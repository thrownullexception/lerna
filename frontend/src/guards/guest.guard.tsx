import React from 'react';
import { connect, ConnectedComponent } from 'react-redux';
import { Redirect } from 'react-router';
import { IStore } from '../store/rootReducers';

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

  const mapStateToProps = (state: IStore) => ({
    isAuthenticated: state.auth.authenticated,
  });

  return connect(mapStateToProps)(AuthenticatedComponent) as React.ComponentType;
}
