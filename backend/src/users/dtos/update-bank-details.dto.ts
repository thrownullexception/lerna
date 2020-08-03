import { IsNotEmpty, IsNumberString, Length } from 'class-validator';

export class UpdateBankDetailsDTO {
  @Length(10, 10, {
    message: 'Account Number should be of 10 Characters',
  })
  @IsNumberString(
    {},
    {
      message: 'Account Number should be only numbers',
    },
  )
  @IsNotEmpty({
    message: 'Account Number is required',
  })
  accountNumber: number;

  @IsNotEmpty({
    message: 'Account Name is required',
  })
  accountName: string;

  @IsNotEmpty({
    message: 'Bank is required',
  })
  bankId: number;
}
