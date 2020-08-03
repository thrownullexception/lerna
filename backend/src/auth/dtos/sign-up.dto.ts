import { IsNotEmpty, MaxLength, IsEmail, IsAlphanumeric, MinLength } from 'class-validator';
import { Unique } from '../../shared/constraints';
import { User } from '../../users/users.entity';

export class SignUpDTO {
  @Unique<SignUpDTO>(
    {
      repositoryModel: User,
    },
    {
      message: 'Email already exists',
    },
  )
  @IsEmail(
    {},
    {
      message: 'Invalid Email',
    },
  )
  @IsNotEmpty({
    message: 'Email is required',
  })
  email: string;

  @Unique<SignUpDTO>(
    {
      repositoryModel: User,
    },
    {
      message: 'Username already exists',
    },
  )
  @IsAlphanumeric('en-GB', {
    message: 'Only letters and numbers are allowed for username',
  })
  @MinLength(4, {
    message: 'Username too short',
  })
  @MaxLength(32, {
    message: 'Username too long',
  })
  @IsNotEmpty({
    message: 'Username is required',
  })
  username: string;

  @MinLength(4, {
    message: 'Password too short',
  })
  @MaxLength(24, {
    message: 'Password too long',
  })
  @IsNotEmpty({
    message: 'Password is required',
  })
  // password strength
  password: string;
}
