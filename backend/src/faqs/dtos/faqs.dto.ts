import { IsNotEmpty } from 'class-validator';
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

  @IsNotEmpty({
    message: 'Answer is required',
  })
  accountModeSystemName: AccountModeType;
}
