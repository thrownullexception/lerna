import { connect } from 'react-redux';
// import { logout } from '../services/auth/auth.actions';
import { IThunkDispatch } from '../../shared/types';
import { IStore } from '../../store/rootReducers';
import { AppLayout } from './App';
import { DispatchProps, StateProps } from './App.types';
import { doLogOut } from '../../app/auth/auth.actions';

const mapStateToProps = (state: IStore): StateProps => {
  return {
    username: state.auth.username,
    permissions: state.auth.permissions,
    role: state.auth.role,
  };
};

const mapDispatchToProps = (dispatch: IThunkDispatch): DispatchProps => {
  return {
    doLogOut: () => {
      dispatch(doLogOut());
    },
  };
};
const connected = connect(mapStateToProps, mapDispatchToProps)(AppLayout);

export { connected as AppContainer };
