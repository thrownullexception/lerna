import get from 'lodash/fp/get';

export class TutorSessionResponse {
  question: string;
  answer: string;
  id: string;

  constructor(jsonObject: object) {
    this.id = get('id', jsonObject);
    this.question = get('question', jsonObject);
    this.answer = get('answer', jsonObject);
  }
}
