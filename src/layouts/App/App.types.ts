export interface IProps {
  doLogOut: () => void;
  username: string;
  role: string;
  permissions: string[];
}

export type DispatchProps = Pick<IProps, 'doLogOut'>;
export type StateProps = Pick<IProps, 'username' | 'permissions' | 'role'>;
