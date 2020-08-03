import { IsNotEmpty, IsUUID } from 'class-validator';

export class AnswerQuizDTO {
  @IsUUID(4)
  @IsNotEmpty({
    message: 'Session ID is required',
  })
  sessionId: string;

  @IsUUID(4)
  @IsNotEmpty({
    message: 'Session Quiz ID is required',
  })
  sessionQuizId: string;

  @IsUUID(4)
  @IsNotEmpty({
    message: 'Session Quiz Response ID is required',
  })
  sessionQuizResponseId: string;

  @IsNotEmpty({
    message: 'Answer is required',
  })
  answer: string;
}
