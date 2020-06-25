import { User } from '../../users/users.entity';
// import { GenderTypes } from '../../profiles/profiles.types';
// import { ConfigService } from '../../shared/services';
// import { APP_CONSTANTS } from '../../shared/constants';
// import {
//   UserSettingsDefaults,
//   UserSettingTypes,
// } from '../../user-settings/user-settings.types';
// import { UserSetting } from '../../user-settings/user-settings.entity';

// const configService = new ConfigService();

export class AuthenticatedUserDetailsTransformer {
  profile: object;
  account: object;
  settings: object;
  bankDetails: object;

  constructor(user: User) {
    //   const gender = this.formatGenderType(user.profile.gender);
    //   this.profile = {
    //     nicename: user.profile.nicename,
    //     image:
    //       user.profile.profileImage ||
    //       configService.getCdnHost(
    //         `${APP_CONSTANTS.AVATARS_PATH}/default-${gender.toLowerCase()}.jpg`,
    //       ),
    //     gender,
    //     dob: user.profile.dob,
    //   };
    //   this.account = {
    //     username: user.username,
    //     email: user.email,
    //     id: user.id,
    //     coins: user.coins,
    //   };
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
    //   this.bankDetails = {
    //     accountNumber: user.bankDetail.accountNumber,
    //     accountName: user.bankDetail.accountName,
    //     bankId: user.bankDetail.bankId,
    //     bankName: user.bankDetail.bank && user.bankDetail.bank.name,
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

  // private formatGenderType(gender: GenderTypes): string {
  //   if (gender === GenderTypes.FEMALE) {
  //     return 'Female';
  //   }
  //   return 'Male';
  // }
}
