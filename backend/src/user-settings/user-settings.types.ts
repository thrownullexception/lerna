export enum UserSettingTypes {
  PUSH_NOTIFICATION = 'pn',
  EMAIL_NOTIFICATION = 'en',
  PROFILE_VISIBLE = 'pv',
}

export const UserSettingsDefaults = {
  [UserSettingTypes.PUSH_NOTIFICATION]: true,
  [UserSettingTypes.EMAIL_NOTIFICATION]: false,
  [UserSettingTypes.PROFILE_VISIBLE]: true,
};
