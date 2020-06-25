import * as React from 'react';
import { IProps, ISignUpForm } from './SignUp.types';
import { SignUpForm } from './SignUp.form';
import { NavigationService } from '../../../services';
import { AuthSignInPath } from '../Auth.types';

export class SignUp extends React.PureComponent<IProps> {
  render() {
    const { isMakingRequest } = this.props;
    return (
      <div className="sign-up-body wd-md-50p">
        <div className="main-signin-header">
          <div className="">
            <h2>Welcome</h2>
            <h4 className="text-left">Sign Up</h4>
            <SignUpForm onSubmit={this.doSignUp} isMakingRequest={isMakingRequest} />
          </div>
        </div>
        <div className="main-signin-footer mg-t-10">
          <p>
            Already Have An Account
            <a href={NavigationService.hashPath(AuthSignInPath)}>Sign In</a>
          </p>
        </div>
      </div>
    );
  }
  private doSignUp = (signUpForm: ISignUpForm) => {
    this.props.doSignUp(signUpForm);
  };
}
