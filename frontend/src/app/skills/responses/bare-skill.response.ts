import get from 'lodash/fp/get';

export class BareSkillResponse {
  id: string;
  name: string;

  constructor(jsonObject: object) {
    this.id = get('id', jsonObject);
    this.name = get('name', jsonObject);
  }
}
