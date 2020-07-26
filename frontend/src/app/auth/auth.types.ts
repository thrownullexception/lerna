export enum AccountModeType {
  Tutor = 'tutor',
  Student = 'student',
}

export const AccountModePaths = {
  [AccountModeType.Student]: 'student',
  [AccountModeType.Tutor]: 'tutor',
};

export const AccountModeLabel = {
  [AccountModeType.Student]: 'Student',
  [AccountModeType.Tutor]: 'Tutor',
};

export const JWT_TOKEN_STORAGE_KEY = 'JWT_TOKEN_STORAGE_KEY';
