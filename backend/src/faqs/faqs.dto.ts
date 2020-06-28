import { IsNotEmpty, IsUUID } from 'class-validator';

export class FaqDTO {
  @IsNotEmpty()
  @IsUUID(4)
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
