export const JWT_TOKEN_STORAGE_KEY = 'JWT_TOKEN_STORAGE_KEY';

export enum ActionType {
  AUTHENTICATE_USER = 'AUTHENTICATE_USER',
  LOG_OUT = 'LOG_OUT',
  MAKING_AUTH_REQUEST = 'MAKING_AUTH_REQUEST',
  AUTH_REQUEST_ENDED = 'AUTH_REQUEST_ENDED',
  SET_SIGN_UP_CREDENTIALS = 'SET_SIGN_UP_CREDENTIALS',
}

export enum AccountModeType {
  Tutor,
  Student,
  Admin,
}

export interface IAuthenticatedAccount {
  username: string;
  email: string;
  id: number;
  coins: number;
}

export interface IAuthState {
  authenticated: boolean;
  isMakingRequest: boolean;
  accountMode: AccountModeType;
  email: string;
  id: number;
  profile: {
    lastName: string;
    firstName: string;
  };
  role: string;
  permissions: string[];
}

interface ISetSignUpCredentials {
  type: ActionType.SET_SIGN_UP_CREDENTIALS;
  payload: {
    id: number;
    email: string;
  };
}

interface IAuthenticateUser {
  type: ActionType.AUTHENTICATE_USER;
  payload: {
    account: IAuthenticatedAccount;
    role: object;
  };
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
  | ISetSignUpCredentials
  | IMakingAuthRequest
  | IDefaultAction;
