import { Dispatch } from 'redux';
import { action } from 'typesafe-actions';
import { ThunkInterface } from '../../shared/types';
import { AuthAction, ActionType, JWT_TOKEN_STORAGE_KEY, IAuthenticatedAccount } from './auth.types';
import { RequestService, ToastService, NavigationService, StorageService } from '../../services';
import { ISignInForm } from '../../screens/Auth/SignIn/SignIn.types';
import { ISignUpForm } from '../../screens/Auth/SignUp/SignUp.types';
import { DashboardPath } from '../../screens/Dashboard';
import { AuthSignInPath } from '../../screens/Auth/Auth.types';

interface IAuthenticationBag {
  account: IAuthenticatedAccount;
}

interface IAuthenticationResponse {
  data: {
    authenticationBag: IAuthenticationBag;
    authToken: string;
    responseMeta?: 'RETURNING_USER' | 'ACCOUNT_VERIFICATION_FAILED' | 'NEW_AUTH_PROVIDER_USER';
    role: object;
  };
}

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


export const doSignIn = (signInForm: ISignInForm): ThunkInterface<void> => {
  return async (dispatch: Dispatch<AuthAction>) => {
    dispatch(action(ActionType.MAKING_AUTH_REQUEST));
    try {
      const response: IAuthenticationResponse = await RequestService.post(
        'auth/signin',
        signInForm,
      );
      const { responseMeta, authenticationBag, authToken, role } = response.data;
      if (!role) {
        ToastService.error('Invalid Login');
        dispatch(action(ActionType.AUTH_REQUEST_ENDED));
        return;
      }
      if (responseMeta === 'ACCOUNT_VERIFICATION_FAILED') {
        ToastService.error('Account Not Verifed');
        dispatch(action(ActionType.AUTH_REQUEST_ENDED));
        return;
      }
      const { account } = authenticationBag;
      dispatch(
        action(ActionType.AUTHENTICATE_USER, {
          account,
          role,
        }),
      );
      StorageService.setString(JWT_TOKEN_STORAGE_KEY, authToken);
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
