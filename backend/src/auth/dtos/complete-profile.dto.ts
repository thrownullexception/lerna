import { IsNotEmpty, IsEnum } from 'class-validator';
import { GenderTypes } from '../../genders/genders.types';

export class CompleteProfileDTO {
  nicename: string;

  dob: string;

  @IsNotEmpty({
    message: 'Gender is required',
  })
  @IsEnum(GenderTypes)
  gender: GenderTypes;
}
