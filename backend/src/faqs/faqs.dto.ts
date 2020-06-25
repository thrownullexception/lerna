import { IsNotEmpty } from 'class-validator';

export class FaqDTO {
  @IsNotEmpty({
    message: 'Question is required',
  })
  question: string;

  @IsNotEmpty({
    message: 'Answer is required',
  })
  answer: string;
}
