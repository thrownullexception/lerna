export interface IProps {
  doSignUp: (signupForm: ISignUpForm) => void;
  isMakingRequest: boolean;
}

export type StateProps = Pick<IProps, 'isMakingRequest'>;
export type DispatchProps = Pick<IProps, 'doSignUp'>;

export interface ISignUpForm {
  email: string;
  password: string;
  lastName: string;
  firstName: string;
}

export const SignUpPath = 'signup';
