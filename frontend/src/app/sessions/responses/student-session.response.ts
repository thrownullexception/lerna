import get from 'lodash-es/get';

export class StudentSessionResponse {
  statusName: string;
  createdAt: string;
  title: string;
  id: string;
  skills: string[];

  constructor(jsonObject: object) {
    this.id = get(jsonObject, 'id');
    this.title = get(jsonObject, 'title');
    this.statusName = get(jsonObject, 'statusName');
    this.createdAt = get(jsonObject, 'createdAt');
    this.skills = get(jsonObject, 'skills');
  }
}
