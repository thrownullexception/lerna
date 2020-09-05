import get from 'lodash-es/get';
import { StatusThemes } from '../../types';

export class StudentSessionResponse {
  statusDisplayName: string;
  statusTheme: StatusThemes;
  description: string;
  createdAt: string;
  title: string;
  id: string;
  skills: string[];

  constructor(jsonObject: object) {
    this.id = get(jsonObject, 'id');
    this.title = get(jsonObject, 'title');
    this.statusTheme = get(jsonObject, 'statusTheme');
    this.statusDisplayName = get(jsonObject, 'statusDisplayName');
    this.description = get(jsonObject, 'description');
    this.createdAt = get(jsonObject, 'createdAt');
    this.skills = get(jsonObject, 'skills');
  }
}
