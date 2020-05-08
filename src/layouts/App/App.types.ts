export interface IProps {
  doLogOut: () => void;
  fullName: string;
  role: string;
  permissions: string[];
}

export type DispatchProps = Pick<IProps, 'doLogOut'>;
export type StateProps = Pick<IProps, 'fullName' | 'permissions' | 'role'>;
