import { IsNotEmpty } from 'class-validator';

export class ChangePasswordDTO {
  @IsNotEmpty({
    message: 'Old Password is required',
  })
  oldPassword: string;

  @IsNotEmpty({
    message: 'New Password is required',
  })
  newPassword: string;
}
