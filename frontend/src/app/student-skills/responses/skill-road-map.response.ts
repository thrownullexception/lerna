import get from 'lodash-es/get';

export class SkillRoadMapResponse {
  id: string;
  level: number;
  order: number;
  title: string;
  description: string;

  constructor(jsonObject: object) {
    this.id = get(jsonObject, 'id');
    this.level = get(jsonObject, 'level');
    this.order = get(jsonObject, 'order');
    this.title = get(jsonObject, 'title');
    this.description = get(jsonObject, 'description');
  }
}
