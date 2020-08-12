import { IsNotEmpty, IsUUID } from 'class-validator';

export class AnswerQuestionDTO {
  @IsUUID(4)
  @IsNotEmpty({
    message: 'Session ID is required',
  })
  sessionId: string;

  @IsUUID(4)
  @IsNotEmpty({
    message: 'Session Question ID is required',
  })
  sessionQuestionId: string;

  @IsUUID(4)
  @IsNotEmpty({
    message: 'Session Question Response ID is required',
  })
  sessionQuestionResponseId: string;

  @IsNotEmpty({
    message: 'Answer is required',
  })
  answer: string;
}
