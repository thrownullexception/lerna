import { connect } from 'react-redux';
import { IThunkDispatch } from '../../shared/types';
import { IStore } from '../../store/rootReducers';
import { AppLayout } from './App';
import { DispatchProps, StateProps } from './App.types';
import { AuthActions } from '../../app/auth/auth.actions';
import { AuthSelectors } from '../../app/auth/auth.selectors';
import { AccountModeType } from '../../app/auth/auth.types';

const mapStateToProps = (state: IStore): StateProps => {
  return {
    fullName: AuthSelectors.selectUserFullName(state),
    picture: AuthSelectors.selectUserPicture(state),
    accountModeLabel: AuthSelectors.selectAccountModeLabel(state),
    accountMode: AuthSelectors.selectAccountMode(state),
  };
};

const mapDispatchToProps = (dispatch: IThunkDispatch): DispatchProps => {
  return {
    doLogOut: () => {
      dispatch(AuthActions.doLogOut());
    },
    changeAccountMode: (mode: AccountModeType) => {
      dispatch(AuthActions.changeAccountMode(mode));
    },
  };
};
const connected = connect(mapStateToProps, mapDispatchToProps)(AppLayout);

export { connected as AppContainer };
