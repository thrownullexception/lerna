import { IsNotEmpty } from 'class-validator';

export class ResendVerificationCodeDTO {
  @IsNotEmpty({
    message: 'Email is required',
  })
  email: string;
}
