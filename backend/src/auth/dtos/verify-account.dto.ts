import { IsNotEmpty, IsNumber } from 'class-validator';

export class VerifyAccountDTO {
  @IsNotEmpty({
    message: 'Email is required',
  })
  email: string;

  @IsNotEmpty({
    message: 'Verification Code is required',
  })
  code: string;
}
