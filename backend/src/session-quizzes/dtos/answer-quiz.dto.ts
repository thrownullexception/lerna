import { IsNotEmpty, IsUUID } from 'class-validator';

export class AnswerQuizDTO {
  @IsNotEmpty({
    message: 'Session ID is required',
  })
  @IsUUID(4)
  sessionId: string;

  @IsNotEmpty({
    message: 'Session Quiz ID is required',
  })
  @IsUUID(4)
  sessionQuizId: string;

  @IsNotEmpty({
    message: 'Session Quiz Response ID is required',
  })
  @IsUUID(4)
  sessionQuizResponseId: string;

  @IsNotEmpty({
    message: 'Answer is required',
  })
  answer: string;
}
