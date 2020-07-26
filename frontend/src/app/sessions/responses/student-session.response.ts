import get from 'lodash-es/get';

export class StudentSessionResponse {
  question: string;
  answer: string;
  xxxxx: string;
  id: string;

  constructor(jsonObject: object) {
    this.id = get(jsonObject, 'id');
    this.question = get(jsonObject, 'question');
    this.answer = get(jsonObject, 'answer');
    this.xxxxx = get(jsonObject, 'xxxxx');
  }
}
