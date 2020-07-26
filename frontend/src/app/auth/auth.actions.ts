import { Dispatch } from 'redux';
import { ThunkInterface } from '../../shared/types';
import { JWT_TOKEN_STORAGE_KEY, AccountModeType } from './auth.types';
import { RequestService, ToastService, NavigationService, StorageService } from '../../services';
import { ISignInForm } from '../../screens/Auth/SignIn/SignIn.types';
import { ISignUpForm } from '../../screens/Auth/SignUp/SignUp.types';
import { DashboardPath } from '../../screens/Dashboard';
import { AuthSignInPath } from '../../screens/Auth/Auth.types';
import { SignInResponse } from './responses';
import { requestStatusSlice } from '../request-status/request-status.ducks';
import { authSlice } from './auth.ducks';

export class AuthActions {
  static doSignUp(signUpForm: ISignUpForm): ThunkInterface<void> {
    return async (dispatch: Dispatch) => {
      dispatch(requestStatusSlice.actions.formRequestStarted());
      try {
        const {
          data: { id },
        } = await RequestService.post('auth/signup', signUpForm);
        ToastService.success('Sign up was successfull');
        dispatch(
          authSlice.actions.setSignUpCredentials({
            id,
            email: signUpForm.email,
          }),
        );
        NavigationService.goTo('VerifyAccount');
      } catch (e) {
        ToastService.error(e);
      }
      dispatch(requestStatusSlice.actions.formRequestEnded());
    };
  }

  static changeAccountMode = (mode: AccountModeType): ThunkInterface<void> => {
    return async (dispatch: Dispatch) => {
      dispatch(authSlice.actions.changeAccountMode(mode));
      // await RequestService.patch('user/account_mode', { mode }); // TODO
      if (mode === AccountModeType.Student) {
        NavigationService.goTo(NavigationService.studentPath(DashboardPath));
      }
      if (mode === AccountModeType.Tutor) {
        NavigationService.goTo(NavigationService.tutorPath(DashboardPath));
      }
    };
  };

  static doSignIn = (signInForm: ISignInForm): ThunkInterface<void> => {
    return async (dispatch: Dispatch) => {
      dispatch(requestStatusSlice.actions.formRequestStarted());
      try {
        const response = await RequestService.post('auth/signin', signInForm);
        if (response.data.responseMeta === 'ACCOUNT_VERIFICATION_FAILED') {
          ToastService.error('Account Not Verifed');
          dispatch(requestStatusSlice.actions.formRequestEnded());
          return;
        }
        const signInResponse = new SignInResponse(response.data);
        dispatch(authSlice.actions.authenticateUser(signInResponse));
        StorageService.setString(JWT_TOKEN_STORAGE_KEY, signInResponse.token);
        NavigationService.goTo(DashboardPath);
      } catch (e) {
        ToastService.error(e);
      }
      dispatch(requestStatusSlice.actions.formRequestEnded());
    };
  };

  static doLogOut = (): ThunkInterface<void> => {
    return async (dispatch: Dispatch) => {
      dispatch(authSlice.actions.logOut());
      StorageService.removeString(JWT_TOKEN_STORAGE_KEY);
      NavigationService.goTo(AuthSignInPath);
    };
  };
}
