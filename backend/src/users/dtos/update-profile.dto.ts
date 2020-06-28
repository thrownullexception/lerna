import { IsNotEmpty, IsEnum } from 'class-validator';
import { GenderTypes } from '../../genders/genders.types';

export class UpdateProfileDTO {
  @IsNotEmpty({
    message: 'Nicename is required',
  })
  nicename: string;

  @IsNotEmpty({
    message: 'DOB is required',
  })
  dob: string;

  @IsNotEmpty({
    message: 'Gender is required',
  })
  @IsEnum(GenderTypes)
  gender: GenderTypes;
}
