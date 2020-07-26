import { connect } from 'react-redux';
import { IThunkDispatch } from '../../../shared/types';
import { IStore } from '../../../store/rootReducers';
import { SignUp } from './SignUp';
import { DispatchProps, StateProps, ISignUpForm } from './SignUp.types';
import { AuthActions } from '../../../app/auth/auth.actions';
import { RequestStatusSelectors } from '../../../app/request-status/request-status.selectors';

const mapStateToProps = (state: IStore): StateProps => {
  return {
    isMakingRequest: RequestStatusSelectors.selectIsMakingFormRequest(state),
  };
};

const mapDispatchToProps = (dispatch: IThunkDispatch): DispatchProps => {
  return {
    doSignUp: (signUpForm: ISignUpForm) => {
      dispatch(AuthActions.doSignUp(signUpForm));
    },
  };
};

const connected = connect(mapStateToProps, mapDispatchToProps)(SignUp);

export { connected as SignUpContainer };
