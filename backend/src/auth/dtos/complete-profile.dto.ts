import { IsNotEmpty, IsEnum, IsOptional } from 'class-validator';
import { GenderTypes } from '../../genders/genders.types';

export class CompleteProfileDTO {
  @IsOptional()
  nicename: string;

  @IsOptional()
  dob: string;

  @IsEnum(GenderTypes)
  @IsNotEmpty({
    message: 'Gender is required',
  })
  gender: GenderTypes;
}
