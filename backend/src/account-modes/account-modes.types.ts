import { ISelectOptions } from '../shared/types';

export enum AccountModeType {
  Student = 'student',
  Tutor = 'tutor',
}

export const AccountModeAsOptions: ISelectOptions[] = [
  { value: AccountModeType.Tutor, label: 'Tutor' },
  { value: AccountModeType.Tutor, label: 'Student' },
];
