import { IsNotEmpty, IsEnum } from 'class-validator';
import { UserSettingTypes } from '../user-settings.types';

export class UserSettingDTO {
  @IsNotEmpty({
    message: 'Settings field is required',
  })
  @IsEnum(UserSettingTypes, {
    message: 'Invalid settings field',
  })
  field: UserSettingTypes;

  @IsNotEmpty({
    message: 'Settings value is required',
  })
  value: string;
}
