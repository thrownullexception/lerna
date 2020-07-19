import get from 'lodash/fp/getOr';
import { SkillResponse } from './skill.response';
import { SkillHierarchyResponse } from './skill-hierarchy.response';

export class SkillsWithHierarchiesResponse {
  skills: SkillResponse[];
  hierarchies: SkillHierarchyResponse[];

  constructor(jsonObject: object) {
    this.hierarchies = get([], ['hierarchies'], jsonObject).map(
      (hierachy: object) => new SkillHierarchyResponse(hierachy),
    );
    this.skills = get([], ['skills'], jsonObject).map(
      (skill: object) => new SkillResponse(skill, this.hierarchies),
    );
  }
}
