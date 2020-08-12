import shuffle from 'lodash/fp/shuffle';
import { INextSessionQuestion } from '../session-questions.types';

export class NextSessionQuestionTransformer {
  id: string;
  question: string;
  sessionQuestionResponseId: string;
  checkResult: boolean;
  result: boolean;
  options: string[];

  constructor(sessionQuestion: INextSessionQuestion) {
    if (!sessionQuestion) {
      return;
    }
    this.id = sessionQuestion.id;
    this.sessionQuestionResponseId = sessionQuestion.sessionQuestionResponseId;
    this.checkResult = sessionQuestion.checkResult;
    this.result = sessionQuestion.result;
    this.question = sessionQuestion.question;
    this.options = shuffle(
      [
        sessionQuestion.optionA,
        sessionQuestion.optionB,
        sessionQuestion.optionC,
        sessionQuestion.optionD,
        sessionQuestion.optionE,
      ].filter(option => option),
    );
  }
}
