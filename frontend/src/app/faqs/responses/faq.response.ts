import get from 'lodash-es/get';

export class FaqResponse {
  question: string;
  answer: string;
  id: string;

  constructor(jsonObject: object) {
    this.id = get(jsonObject, 'id');
    this.question = get(jsonObject, 'question');
    this.answer = get(jsonObject, 'answer');
  }
}
