import { connect } from 'react-redux';
import { IThunkDispatch } from '../../../shared/types';
import { IStore } from '../../../store/rootReducers';
import { SignUp } from './SignUp';
import { DispatchProps, StateProps, ISignUpForm } from './SignUp.types';
import { AuthActions } from '../../../app/auth/auth.actions';
import { RequestStatusSelectors } from '../../../app/request-status/request-status.selectors';

export const SignUpContainer = connect(
  (state: IStore): StateProps => ({
    isMakingRequest: RequestStatusSelectors.selectIsMakingFormRequest(state),
  }),
  (dispatch: IThunkDispatch): DispatchProps => ({
    doSignUp: (signUpForm: ISignUpForm) => {
      dispatch(AuthActions.doSignUp(signUpForm));
    },
  }),
)(SignUp);
