import get from 'lodash/fp/get';

export class SkillHierarchyResponse {
  id: string;
  order: number;
  childId: string;
  parentId: string;

  constructor(jsonObject: object) {
    this.id = get('id', jsonObject);
    this.order = get('order', jsonObject);
    this.childId = get('childId', jsonObject);
    this.parentId = get('parentId', jsonObject);
  }
}
