import get from 'lodash/fp/getOr';
import { SkillResponse } from './skill.response';
import { SkillHierarchyResponse } from './skill-hierarchy.response';

export class SkillsResponse {
  skills: SkillResponse[];
  hierarchies: SkillHierarchyResponse[];

  constructor(jsonObject: object) {
    this.hierarchies = get([], ['data', 'skill_hierarchies'], jsonObject).map(
      (hierachy: object) => new SkillHierarchyResponse(hierachy),
    );
    this.skills = get([], ['data', 'skills'], jsonObject).map(
      (skill: object) => new SkillResponse(skill, this.hierarchies),
    );
  }
}
