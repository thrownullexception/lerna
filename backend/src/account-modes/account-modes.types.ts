import { ISelectOptions } from 'src/shared/types';

export enum AccountModeType {
  Student = 'student',
  Tutor = 'tutor',
}

export const AccountModeAsOptions: ISelectOptions[] = [
  { value: 'tutor', label: 'Tutor' },
  { value: 'student', label: 'Student' },
];
