import { AccountModeType } from '../../app/auth/auth.types';

export interface IProps {
  doLogOut: () => void;
  changeAccountMode: (mode: AccountModeType) => void;
  fullName: string;
  accountMode: AccountModeType;
  accountModeLabel: string;
  picture: string;
}

export type DispatchProps = Pick<IProps, 'doLogOut' | 'changeAccountMode'>;
export type StateProps = Pick<IProps, 'fullName' | 'picture' | 'accountMode' | 'accountModeLabel'>;
