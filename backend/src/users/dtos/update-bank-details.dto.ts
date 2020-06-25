import { IsNotEmpty, IsNumberString, Length } from 'class-validator';

export class UpdateBankDetailsDTO {
  @IsNotEmpty({
    message: 'Account Number is required',
  })
  @IsNumberString(
    {},
    {
      message: 'Account Number should be only numbers',
    },
  )
  @Length(10, 10, {
    message: 'Account Number should be of 10 Characters',
  })
  accountNumber: number;

  @IsNotEmpty({
    message: 'Account Name is required',
  })
  accountName: string;

  @IsNotEmpty({
    message: 'Bank is required',
  })
  @IsNumberString(
    {},
    {
      message: 'Invalid Bank',
    },
  )
  bankId: number;
}
