import { SignInResponse } from './responses';

export enum AccountModeType {
  Tutor = 'tutor',
  Student = 'student',
}

export const AccountModePaths = {
  [AccountModeType.Student]: 'student',
  [AccountModeType.Tutor]: 'tutor',
};

export const AccountModeLabel = {
  [AccountModeType.Student]: 'Student',
  [AccountModeType.Tutor]: 'Tutor',
};

export const JWT_TOKEN_STORAGE_KEY = 'JWT_TOKEN_STORAGE_KEY';

export enum ActionType {
  AUTHENTICATE_USER = 'AUTHENTICATE_USER',
  LOG_OUT = 'LOG_OUT',
  MAKING_AUTH_REQUEST = 'MAKING_AUTH_REQUEST',
  AUTH_REQUEST_ENDED = 'AUTH_REQUEST_ENDED',
  CHANGE_ACCOUNT_MODE = 'CHANGE_ACCOUNT_MODE',
  SET_SIGN_UP_CREDENTIALS = 'SET_SIGN_UP_CREDENTIALS',
}

export interface IAuthState {
  authenticated: boolean;
  isMakingRequest: boolean;
  accountMode: AccountModeType;
  email: string;
  id: string;
  profile: {
    lastName: string;
    firstName: string;
    picture: string;
  };
  role: string;
}

interface ISetSignUpCredentials {
  type: ActionType.SET_SIGN_UP_CREDENTIALS;
  payload: {
    id: string;
    email: string;
  };
}

interface IAuthenticateUser {
  type: ActionType.AUTHENTICATE_USER;
  payload: SignInResponse;
}

interface IChangeAccountMode {
  type: ActionType.CHANGE_ACCOUNT_MODE;
  payload: AccountModeType;
}

interface ILogOut {
  type: ActionType.LOG_OUT;
}

interface IMakingAuthRequest {
  type: ActionType.MAKING_AUTH_REQUEST;
}

interface IAuthRequestEnded {
  type: ActionType.AUTH_REQUEST_ENDED;
}

interface IDefaultAction {
  type: '';
}

export type AuthAction =
  | IAuthenticateUser
  | ILogOut
  | IAuthRequestEnded
  | IChangeAccountMode
  | ISetSignUpCredentials
  | IMakingAuthRequest
  | IDefaultAction;
