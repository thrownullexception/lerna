import { connect } from 'react-redux';
import { IThunkDispatch } from '../../shared/types';
import { IStore } from '../../store/rootReducers';
import { SignIn } from './SignIn';
import { DispatchProps, StateProps, ISignInForm } from './SignIn.types';
import { doSignIn } from '../../app/auth/auth.actions';

const mapStateToProps = (state: IStore): StateProps => {
  return {
    isMakingRequest: state.auth.isMakingRequest,
  };
};

const mapDispatchToProps = (dispatch: IThunkDispatch): DispatchProps => {
  return {
    doSignIn: (signInForm: ISignInForm) => {
      dispatch(doSignIn(signInForm));
    },
  };
};
const connected = connect(mapStateToProps, mapDispatchToProps)(SignIn);

export { connected as SignInContainer };
