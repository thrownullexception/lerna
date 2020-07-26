import get from 'lodash-es/get';
import { SkillResponse } from './skill.response';
import { SkillHierarchyResponse } from './skill-hierarchy.response';

export class SkillsWithHierarchiesResponse {
  skills: SkillResponse[];
  hierarchies: SkillHierarchyResponse[];

  constructor(jsonObject: object) {
    this.hierarchies = get(jsonObject, ['hierarchies'], []).map(
      (hierachy: object) => new SkillHierarchyResponse(hierachy),
    );
    this.skills = get(jsonObject, ['skills'], []).map(
      (skill: object) => new SkillResponse(skill, this.hierarchies),
    );
  }
}
