import { IsNotEmpty } from 'class-validator';

export class FaqDTO {
  id: string;

  @IsNotEmpty({
    message: 'Question is required',
  })
  question: string;

  @IsNotEmpty({
    message: 'Answer is required',
  })
  answer: string;
}
