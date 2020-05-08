import * as React from 'react';
import { IProps, ISignInForm } from './SignIn.types';
import { SignInForm } from './SignIn.form';
import { NavigationService } from '../../../services';
import { AuthSignUpPath } from '../Auth.types';

export class SignIn extends React.PureComponent<IProps> {
  render() {
    const { isMakingRequest } = this.props;
    return (
      <div className="sign-up-body wd-md-50p">
        <div className="main-signin-header">
          <div className="">
            <h2>Welcome back!</h2>
            <h4 className="text-left">Sign In</h4>
            <SignInForm onSubmit={this.doSignIn} isMakingRequest={isMakingRequest} />
          </div>
        </div>
        <div className="main-signup-footer mg-t-10">
          <p>
            Dont Have An Account <a href={NavigationService.hashPath(AuthSignUpPath)}>Sign Up</a>
          </p>
        </div>
      </div>
    );
  }
  private doSignIn = (signInForm: ISignInForm) => {
    this.props.doSignIn(signInForm);
  };
}
