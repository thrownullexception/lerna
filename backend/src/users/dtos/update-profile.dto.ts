import { IsNotEmpty } from 'class-validator';
import { GenderTypes } from '../../profiles/profiles.types';

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
  gender: GenderTypes;
}
