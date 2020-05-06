export interface IProps {
  doSignIn: (signInForm: ISignInForm) => void;
  isMakingRequest: boolean;
}

export type StateProps = Pick<IProps, 'isMakingRequest'>;
export type DispatchProps = Pick<IProps, 'doSignIn'>;

export interface ISignInForm {
  email: string;
  password: string;
}
