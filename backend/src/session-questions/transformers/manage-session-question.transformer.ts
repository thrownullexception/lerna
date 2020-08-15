import { SessionQuestion } from '../session-questions.entity';

export class ManagesessionQuestionTransformer {
  id: string;
  question: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  optionE: string;

  constructor(sessionQuestion: SessionQuestion) {
    this.id = sessionQuestion.id;
    this.question = sessionQuestion.question;
    this.optionA = sessionQuestion.optionA;
    this.optionB = sessionQuestion.optionB;
    this.optionC = sessionQuestion.optionC;
    this.optionD = sessionQuestion.optionD;
    this.optionE = sessionQuestion.optionE;
  }
}
