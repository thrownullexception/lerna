import { AccountModeType } from '../../app/auth/auth.types';

export interface IProps {
  doLogOut: () => void;
  changeAccountMode: (mode: AccountModeType) => void;
  fullName: string;
  role: string;
  accountModeLabel: string;
  picture: string;
  permissions: string[];
}

export type DispatchProps = Pick<IProps, 'doLogOut' | 'changeAccountMode'>;
export type StateProps = Pick<
  IProps,
  'fullName' | 'picture' | 'permissions' | 'accountModeLabel' | 'role'
>;
