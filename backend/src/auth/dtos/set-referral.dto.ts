import { IsNotEmpty } from 'class-validator';

export class SetReferralDTO {
  @IsNotEmpty({
    message: 'Referral Username is required',
  })
  username: string;
}
