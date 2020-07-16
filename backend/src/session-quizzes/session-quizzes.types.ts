import { SessionQuiz } from './session-quizzes.entity';

export interface INextSessionQuiz extends Partial<SessionQuiz> {
  sessionQuizResponseId?: string;
  checkResult?: boolean;
  result?: boolean;
}
