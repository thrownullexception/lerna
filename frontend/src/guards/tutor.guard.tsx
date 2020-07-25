import React from 'react';
import { connect, ConnectedComponent } from 'react-redux';
import { Redirect } from 'react-router';
import { IStore } from '../store/rootReducers';
import { DashboardPath } from '../screens/Dashboard';
import { NavigationService } from '../services';
import { AuthSelectors } from '../app/auth/auth.selectors';
import { AccountModeType } from '../app/auth/auth.types';
import { authenticationGuard } from './authentication.guard';

interface IProps {
  accountMode: AccountModeType;
}

interface InjectedProps extends IProps {
  location: Location;
}

export function tutorGuard(
  Component: React.ComponentType | ConnectedComponent<any, {}>,
): React.ComponentType {
  class GuardedComponent extends React.PureComponent<IProps> {
    get injected() {
      return this.props as InjectedProps;
    }
    render() {
      const Component1 = authenticationGuard(Component);
      if (this.props.accountMode !== AccountModeType.Tutor) {
        return <Redirect to={NavigationService.studentPath(DashboardPath)} />;
      }
      return <Component1 {...this.props} />;
    }
  }

  const mapStateToProps = (state: IStore) => ({
    accountMode: AuthSelectors.selectAccountMode(state),
  });

  return connect(mapStateToProps)(GuardedComponent) as React.ComponentType;
}
