import get from 'lodash/fp/get';
import { SkillHierarchyResponse } from './skill-hierarchy.response';

export class SkillResponse {
  id: string;
  isPath: boolean;
  name: string;
  description: string;
  hasChildren: boolean;
  hasParent: boolean;

  constructor(jsonObject: object, skillsHierarchies: SkillHierarchyResponse[] = []) {
    this.id = get('id', jsonObject);
    this.isPath = get('is_path', jsonObject);
    this.name = get('name', jsonObject);
    this.description = get('description', jsonObject);
    this.hasChildren = skillsHierarchies.some(({ parentId }) => parentId === this.id);
    this.hasParent = skillsHierarchies.some(({ childId }) => childId === this.id);
  }
}
