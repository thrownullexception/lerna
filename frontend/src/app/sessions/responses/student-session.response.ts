import get from 'lodash-es/get';

export class StudentSessionResponse {
  statusDisplayName: string;
  statusSystemName: string;
  createdAt: string;
  title: string;
  id: string;
  skills: string[];

  constructor(jsonObject: object) {
    this.id = get(jsonObject, 'id');
    this.title = get(jsonObject, 'title');
    this.statusSystemName = get(jsonObject, 'statusSystemName');
    this.statusDisplayName = get(jsonObject, 'statusDisplayName');
    this.createdAt = get(jsonObject, 'createdAt');
    this.skills = get(jsonObject, 'skills');
  }
}
