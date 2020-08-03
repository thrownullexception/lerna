import { IsNotEmpty, IsEnum } from 'class-validator';
import { UserSettingTypes } from '../user-settings.types';

export class UserSettingDTO {
  @IsEnum(UserSettingTypes, {
    message: 'Invalid settings field',
  })
  @IsNotEmpty({
    message: 'Settings field is required',
  })
  field: UserSettingTypes;

  @IsNotEmpty({
    message: 'Settings value is required',
  })
  value: string;
}
