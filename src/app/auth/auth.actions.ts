import { Dispatch } from 'redux';
import { action } from 'typesafe-actions';
import { ThunkInterface } from '../../shared/types';
import { AuthAction, ActionType, JWT_TOKEN_STORAGE_KEY, IAuthenticatedAccount } from './auth.types';
import { RequestService, ToastService, NavigationService, StorageService } from '../../services';
import { ISignInForm } from '../../screens/SignIn/SignIn.types';
import { DashboardPath } from '../../screens/Dashboard';
import { SignInPath } from '../../screens/SignIn';

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
    NavigationService.goTo(SignInPath);
  };
};
