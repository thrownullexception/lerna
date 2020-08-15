import { IsNotEmpty, IsUUID } from 'class-validator';
import { BaseSessionQuestionDTO } from './base-session-question.dto';

export class SessionQuestionDTO extends BaseSessionQuestionDTO {
  @IsUUID(4)
  id: string;

  @IsUUID(4)
  @IsNotEmpty({
    message: 'SessionID is required',
  })
  sessionId: string;
}
