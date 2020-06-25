import { Dispatch } from 'redux';
import { action } from 'typesafe-actions';
import { ThunkInterface } from '../../shared/types';
import { AuthAction, ActionType, JWT_TOKEN_STORAGE_KEY, AccountModeType } from './auth.types';
import { RequestService, ToastService, NavigationService, StorageService } from '../../services';
import { ISignInForm } from '../../screens/Auth/SignIn/SignIn.types';
import { ISignUpForm } from '../../screens/Auth/SignUp/SignUp.types';
import { DashboardPath } from '../../screens/Dashboard';
import { AuthSignInPath } from '../../screens/Auth/Auth.types';
import { SignInResponse } from './responses';

export const doSignUp = (signUpForm: ISignUpForm): ThunkInterface<void> => {
  return async (dispatch: Dispatch<AuthAction>) => {
    dispatch(action(ActionType.MAKING_AUTH_REQUEST));
    try {
      const {
        data: { id },
      } = await RequestService.post('auth/signup', signUpForm);
      ToastService.success('Sign up was successfull');
      dispatch(
        action(ActionType.SET_SIGN_UP_CREDENTIALS, {
          id,
          email: signUpForm.email,
        }),
      );
      NavigationService.goTo('VerifyAccount');
    } catch (e) {
      ToastService.error(e);
    }
    dispatch(action(ActionType.AUTH_REQUEST_ENDED));
  };
};

export const changeAccountMode = (mode: AccountModeType): ThunkInterface<void> => {
  return async (dispatch: Dispatch<AuthAction>) => {
    dispatch(action(ActionType.CHANGE_ACCOUNT_MODE, mode));
    // await RequestService.patch('user/account_mode', { mode }); // TODO
    if (mode === AccountModeType.Student) {
      NavigationService.goTo(NavigationService.studentPath(DashboardPath));
    }
    if (mode === AccountModeType.Tutor) {
      NavigationService.goTo(NavigationService.tutorPath(DashboardPath));
    }
  };
};

export const doSignIn = (signInForm: ISignInForm): ThunkInterface<void> => {
  return async (dispatch: Dispatch<AuthAction>) => {
    dispatch(action(ActionType.MAKING_AUTH_REQUEST));
    try {
      const response = await RequestService.post('auth/signin', signInForm);
      const signInResponse = new SignInResponse(response.data);
      // TODO
      // if (responseMeta === 'ACCOUNT_VERIFICATION_FAILED') {
      //   ToastService.error('Account Not Verifed');
      //   dispatch(action(ActionType.AUTH_REQUEST_ENDED));
      //   return;
      // }
      dispatch(action(ActionType.AUTHENTICATE_USER, signInResponse));
      StorageService.setString(JWT_TOKEN_STORAGE_KEY, signInResponse.token);
      NavigationService.goTo(DashboardPath);
    } catch (e) {
      ToastService.error(e);
    }
    dispatch(action(ActionType.AUTH_REQUEST_ENDED));
  };
};

export const doLogOut = (): ThunkInterface<void> => {
  return async (dispatch: Dispatch<AuthAction>) => {
    dispatch(action(ActionType.LOG_OUT));
    StorageService.removeString(JWT_TOKEN_STORAGE_KEY);
    NavigationService.goTo(AuthSignInPath);
  };
};
