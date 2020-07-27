import get from 'lodash-es/get';

export class AllSkillResponse {
  id: string;
  name: string;

  constructor(jsonObject: object) {
    this.id = get(jsonObject, 'id');
    this.name = get(jsonObject, 'name');
  }
}
