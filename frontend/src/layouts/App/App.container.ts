import { connect } from 'react-redux';
import { IThunkDispatch } from '../../shared/types';
import { IStore } from '../../store/rootReducers';
import { AppLayout } from './App';
import { DispatchProps, StateProps } from './App.types';
import { doLogOut, changeAccountMode } from '../../app/auth/auth.actions';
import {
  selectUserFullName,
  selectUserPicture,
  AuthSelectors,
} from '../../app/auth/auth.selectors';
import { AccountModeType } from '../../app/auth/auth.types';

const mapStateToProps = (state: IStore): StateProps => {
  return {
    fullName: selectUserFullName(state),
    picture: selectUserPicture(state),
    accountModeLabel: AuthSelectors.selectAccountModeLabel(state),
    accountMode: AuthSelectors.selectAccountMode(state),
    permissions: [],
    role: state.auth.role,
  };
};

const mapDispatchToProps = (dispatch: IThunkDispatch): DispatchProps => {
  return {
    doLogOut: () => {
      dispatch(doLogOut());
    },
    changeAccountMode: (mode: AccountModeType) => {
      dispatch(changeAccountMode(mode));
    },
  };
};
const connected = connect(mapStateToProps, mapDispatchToProps)(AppLayout);

export { connected as AppContainer };
