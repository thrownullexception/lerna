import get from 'lodash/fp/get';

export class SkillHierarchyResponse {
  id: string;
  order: number;
  childId: string;
  parentId: string;

  constructor(jsonObject: object) {
    this.id = get('id', jsonObject);
    this.order = get('order', jsonObject);
    this.childId = get('child_id', jsonObject);
    this.parentId = get('parent_id', jsonObject);
  }
}
