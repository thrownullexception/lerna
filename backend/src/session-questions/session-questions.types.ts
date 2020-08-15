import { SessionQuestion } from './session-questions.entity';

export interface INextSessionQuestion extends Partial<SessionQuestion> {
  sessionQuestionResponseId?: string;
  checkResult?: boolean;
  result?: boolean;
}
