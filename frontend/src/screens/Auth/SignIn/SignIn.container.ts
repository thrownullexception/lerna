import { connect } from 'react-redux';
import { IThunkDispatch } from '../../../shared/types';
import { IStore } from '../../../store/rootReducers';
import { SignIn } from './SignIn';
import { DispatchProps, StateProps, ISignInForm } from './SignIn.types';
import { AuthActions } from '../../../app/auth/auth.actions';
import { RequestStatusSelectors } from '../../../app/request-status/request-status.selectors';

export const SignInContainer = connect(
  (state: IStore): StateProps => ({
    isMakingRequest: RequestStatusSelectors.selectIsMakingFormRequest(state),
  }),
  (dispatch: IThunkDispatch): DispatchProps => ({
    doSignIn: (signInForm: ISignInForm) => {
      dispatch(AuthActions.doSignIn(signInForm));
    },
  }),
)(SignIn);
