import get from 'lodash-es/get';

export class SystemValueResponse {
  systemName: string;
  displayName: string;

  constructor(jsonObject: object) {
    this.systemName = get(jsonObject, 'systemName');
    this.displayName = get(jsonObject, 'displayName');
  }
}
