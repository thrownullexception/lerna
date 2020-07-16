import { SessionQuiz } from '../session-quizzes.entity';

export class ManageSessionQuizTransformer {
  id: string;
  question: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  optionE: string;

  constructor(sessionQuiz: SessionQuiz) {
    this.id = sessionQuiz.id;
    this.question = sessionQuiz.question;
    this.optionA = sessionQuiz.optionA;
    this.optionB = sessionQuiz.optionB;
    this.optionC = sessionQuiz.optionC;
    this.optionD = sessionQuiz.optionD;
    this.optionE = sessionQuiz.optionE;
  }
}
