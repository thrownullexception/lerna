import {
  IsNotEmpty,
  MaxLength,
  IsEmail,
  IsAlphanumeric,
  MinLength,
} from 'class-validator';
import { Unique } from '../../shared/constraints';

export class SignUpDTO {
  @IsNotEmpty({
    message: 'Email is required',
  })
  @IsEmail(
    {},
    {
      message: 'Invalid Email',
    },
  )
  @Unique('User', {
    message: 'Email already exists',
  })
  email: string;

  @IsNotEmpty({
    message: 'Username is required',
  })
  @Unique('User', {
    message: 'Username already exists',
  })
  @IsAlphanumeric('en-GB', {
    message: 'Only letters and numbers are allowed for username',
  })
  @MinLength(4, {
    message: 'Username too short',
  })
  @MaxLength(32, {
    message: 'Username too long',
  })
  username: string;

  @IsNotEmpty({
    message: 'Password is required',
  })
  @MinLength(4, {
    message: 'Password too short',
  })
  @MaxLength(24, {
    message: 'Password too long',
  })
  // password strength
  password: string;
}
