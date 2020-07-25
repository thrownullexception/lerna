import React from 'react';
import { connect, ConnectedComponent } from 'react-redux';
import { Redirect } from 'react-router';
import { IStore } from '../store/rootReducers';
import { AuthSignInPath } from '../screens/Auth/Auth.types';
import { NavigationService } from '../services';
import { AuthSelectors } from '../app/auth/auth.selectors';

interface IProps {
  isAuthenticated: boolean;
}

interface InjectedProps extends IProps {
  location: Location;
}

export function authenticationGuard(
  Component: React.ComponentType | ConnectedComponent<any, {}>,
): React.ComponentType {
  class AuthenticatedComponent extends React.PureComponent<IProps> {
    get injected() {
      return this.props as InjectedProps;
    }
    render() {
      if (!this.props.isAuthenticated) {
        const redirectAfterLogin = this.injected.location.pathname;
        return (
          <Redirect
            to={`${NavigationService.indexPath(AuthSignInPath)}?next=${redirectAfterLogin}`}
          />
        );
      }
      return <Component {...this.props} />;
    }
  }

  const mapStateToProps = (state: IStore) => ({
    isAuthenticated: AuthSelectors.selectIsAuthenticated(state),
  });

  return connect(mapStateToProps)(AuthenticatedComponent) as React.ComponentType;
}
