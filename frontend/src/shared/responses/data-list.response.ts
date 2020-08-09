import get from 'lodash-es/get';

export class DataListResponse {
  id: string;
  name: string;

  constructor(jsonObject: object) {
    this.id = get(jsonObject, 'id');
    this.name = get(jsonObject, 'name');
  }
}
