import { User } from '../../users/users.entity';

export class AuthenticatedUserDetailsTransformer {
  id: string;
  jwtToken: string;
  email: string;
  lastName: string;
  firstName: string;
  picture: string;
  accountMode: string;

  constructor(user: User, jwtToken: string) {
    this.id = user.id;
    this.email = user.email;
    this.lastName = user.profile.lastName;
    this.firstName = user.profile.firstName;
    this.picture = user.profile.picture;
    this.accountMode = user.accountMode;
    this.jwtToken = jwtToken;
    //   this.settings = {
    //     [UserSettingTypes.PUSH_NOTIFICATION]: this.getSettingValue(
    //       user.settings,
    //       UserSettingTypes.PUSH_NOTIFICATION,
    //     ),
    //     [UserSettingTypes.EMAIL_NOTIFICATION]: this.getSettingValue(
    //       user.settings,
    //       UserSettingTypes.EMAIL_NOTIFICATION,
    //     ),
    //     [UserSettingTypes.PROFILE_VISIBLE]: this.getSettingValue(
    //       user.settings,
    //       UserSettingTypes.PROFILE_VISIBLE,
    //     ),
    //     [UserSettingTypes.GAME_VIBRATION]: this.getSettingValue(
    //       user.settings,
    //       UserSettingTypes.GAME_VIBRATION,
    //     ),
    //     [UserSettingTypes.GAME_SOUND]: this.getSettingValue(
    //       user.settings,
    //       UserSettingTypes.GAME_SOUND,
    //     ),
    //     [UserSettingTypes.GAME_SOUND]: this.getSettingValue(
    //       user.settings,
    //       UserSettingTypes.GAME_SOUND,
    //     ),
    //   };
  }

  // private getSettingValue(
  //   settings: UserSetting[],
  //   settingType: UserSettingTypes,
  // ): string | number | boolean {
  //   const userSetting = settings.find(setting => setting.field === settingType);
  //   if (userSetting) {
  //     switch (typeof UserSettingsDefaults[settingType]) {
  //       case 'number':
  //         return +userSetting.value;
  //       case 'boolean':
  //         return !!userSetting.value;
  //       default:
  //         return userSetting.value;
  //     }
  //   }
  //   return UserSettingsDefaults[settingType];
  // }
}
