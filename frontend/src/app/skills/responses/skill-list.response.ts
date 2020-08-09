import get from 'lodash-es/get';

export class SkillListResponse {
  id: string;
  name: string;

  constructor(jsonObject: object) {
    this.id = get(jsonObject, 'id');
    this.name = get(jsonObject, 'name');
  }
}
