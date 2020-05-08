import { NavigationService } from '../../services';
import { guestGuard } from '../../guards';
import { AuthSignInPath, AuthSignUpPath, IAuthRoutes } from './Auth.types';
import { SignIn } from './SignIn';
import { SignUp } from './SignUp';

export const AuthRoutes: IAuthRoutes[] = [
  {
    title: 'Sign In',
    path: NavigationService.indexPath(AuthSignInPath),
    exact: true,
    component: guestGuard(SignIn),
  },
  {
    title: 'Sign Up',
    path: NavigationService.indexPath(AuthSignUpPath),
    exact: true,
    component: guestGuard(SignUp),
  },
];
