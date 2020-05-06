import * as React from 'react';
import { ToastContainer } from 'react-toastify';
import { IProps, ISignInForm } from './SignIn.types';
import { SignInForm } from './SignIn.form';

export class SignIn extends React.PureComponent<IProps> {
  render() {
    const { isMakingRequest } = this.props;
    return (
      <div className="sign-up-body wd-md-50p">
        <div className="main-signin-header">
          <div className="">
            <h2>Welcome back!</h2>
            <h4 className="text-left">Reset Your Password</h4>
            <form>
              <div className="form-group text-left">
                {' '}
                <label>Email</label>{' '}
                <input className="form-control" placeholder="Enter your email" type="text" />{' '}
              </div>
              <div className="form-group text-left">
                {' '}
                <label>New Password</label>{' '}
                <input className="form-control" placeholder="Enter your password" type="password" />{' '}
              </div>
              <div className="form-group text-left">
                {' '}
                <label>Confirm Password</label>{' '}
                <input className="form-control" placeholder="Enter your password" type="password" />{' '}
              </div>
              <button className="btn ripple btn-main-primary btn-block">Reset Password</button>
            </form>
          </div>
        </div>
        <div className="main-signup-footer mg-t-10">
          <p>
            Already have an account? <a href="page-signin.html">Sign In</a>
          </p>
        </div>
      </div>
      // <div className="dt-root">
      //   <div className="dt-root__inner">
      //     <div className="dt-login--container">
      //       <div className="dt-login__content-wrapper">
      //         <div className="dt-login__bg-section">
      //           <div className="dt-login__bg-content">
      //             <h1 className="dt-login__title">Login</h1>
      //           </div>
      //           <div className="dt-login__logo">
      //             <a className="dt-brand__logo-link" href="index.html">
      //               <img
      //                 className="dt-brand__logo-img"
      //                 src="/assets/images/logo-white.png"
      //                 alt="Drift"
      //               />
      //             </a>
      //           </div>
      //         </div>
      //         <div className="dt-login__content">
      //           <div className="dt-login__content-inner">
      //             <SignInForm onSubmit={this.doSignIn} isMakingRequest={isMakingRequest} />
      //           </div>
      //           {/* <div className="dt-login__content-footer">
      //             <a href="#/">Can’t access your account?</a>
      //           </div> */}
      //         </div>
      //       </div>
      //     </div>
      //   </div>
      // </div>
    );
  }

  private doSignIn = (signInForm: ISignInForm) => {
    this.props.doSignIn(signInForm);
  };
}
