import { RouteConfig } from 'react-router-config';
import { SignInPath } from './SignIn/SignIn.types';
import { SignUpPath } from './SignUp/SignUp.types';

export const AuthPath = 'auth';

const authPrefixRoute = (path: string) => `${AuthPath}/${path}`;

export const AuthSignInPath = authPrefixRoute(SignInPath);
export const AuthSignUpPath = authPrefixRoute(SignUpPath);

export interface IAuthRoutes extends RouteConfig {
  title: string;
}
