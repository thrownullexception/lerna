import get from 'lodash/fp/get';

export class SkillRoadMapResponse {
  id: string;
  level: number;
  order: number;
  title: string;
  description: string;

  constructor(jsonObject: object) {
    this.id = get('id', jsonObject);
    this.level = get('level', jsonObject);
    this.order = get('order', jsonObject);
    this.title = get('title', jsonObject);
    this.description = get('description', jsonObject);
  }
}
