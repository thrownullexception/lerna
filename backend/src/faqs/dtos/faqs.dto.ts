import { IsNotEmpty, IsEnum } from 'class-validator';
import { AccountModeType } from '../../account-modes/account-modes.types';

export class FaqDTO {
  @IsNotEmpty({
    message: 'Question is required',
  })
  question: string;

  @IsNotEmpty({
    message: 'Answer is required',
  })
  answer: string;

  @IsEnum(AccountModeType)
  @IsNotEmpty({
    message: 'Account Mode is required',
  })
  accountModeSystemName: AccountModeType;
}
