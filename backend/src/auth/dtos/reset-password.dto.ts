import { IsNotEmpty } from 'class-validator';

export class ResetPasswordDTO {
  @IsNotEmpty({
    message: 'Email is required',
  })
  email: string;
}
