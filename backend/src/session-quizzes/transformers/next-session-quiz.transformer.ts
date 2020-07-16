import shuffle from 'lodash/fp/shuffle';
import { INextSessionQuiz } from '../session-quizzes.types';

export class NextSessionQuizTransformer {
  id: string;
  question: string;
  sessionQuizResponseId: string;
  checkResult: boolean;
  result: boolean;
  options: string[];

  constructor(sessionQuiz: INextSessionQuiz) {
    if (!sessionQuiz) {
      return;
    }
    this.id = sessionQuiz.id;
    this.sessionQuizResponseId = sessionQuiz.sessionQuizResponseId;
    this.checkResult = sessionQuiz.checkResult;
    this.result = sessionQuiz.result;
    this.question = sessionQuiz.question;
    this.options = shuffle(
      [
        sessionQuiz.optionA,
        sessionQuiz.optionB,
        sessionQuiz.optionC,
        sessionQuiz.optionD,
        sessionQuiz.optionE,
      ].filter(option => option),
    );
  }
}
