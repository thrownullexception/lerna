import get from 'lodash-es/get';

export class SkillHierarchyResponse {
  id: string;
  order: number;
  childId: string;
  parentId: string;

  constructor(jsonObject: object) {
    this.id = get(jsonObject, 'id');
    this.order = get(jsonObject, 'order');
    this.childId = get(jsonObject, 'childId');
    this.parentId = get(jsonObject, 'parentId');
  }
}
