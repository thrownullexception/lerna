import { IsNotEmpty } from 'class-validator';
import { GenderTypes } from '../../profiles/profiles.types';

export class CompleteProfileDTO {
  nicename: string;

  dob: string;

  @IsNotEmpty({
    message: 'Gender is required',
  })
  gender: GenderTypes;
}
