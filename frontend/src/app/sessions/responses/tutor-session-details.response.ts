import get from 'lodash-es/get';

export class TutorSessionDetailsResponse {
  question: string;
  answer: string;
  yyyyyyy: string;
  id: string;

  constructor(jsonObject: object) {
    this.id = get(jsonObject, 'id');
    this.question = get(jsonObject, 'question');
    this.yyyyyyy = get(jsonObject, 'yyyyyyy');
    this.answer = get(jsonObject, 'answer');
  }
}
