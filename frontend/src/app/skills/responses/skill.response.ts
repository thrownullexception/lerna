import get from 'lodash/fp/getOr';
import { SkillHierarchyResponse } from './skill-hierarchy.response';
import { SkillRoadMapResponse } from './skill-road-map.response';
import { SkillResourceResponse } from './skill-resource.response';

export class SkillResponse {
  id: string;
  isPath: boolean;
  name: string;
  description: string;
  hasChildren: boolean;
  hasParent: boolean;
  relatedSkills: SkillResponse[];
  roadMaps: SkillRoadMapResponse[];
  resources: SkillResourceResponse[];

  constructor(jsonObject: object, skillsHierarchies: SkillHierarchyResponse[] = []) {
    this.id = get('', 'id', jsonObject);
    this.isPath = get('', 'isPath', jsonObject);
    this.name = get('', 'name', jsonObject);
    this.description = get('', 'description', jsonObject);
    this.relatedSkills = get([], 'relatedSkills', jsonObject).map(
      (skill: object) => new SkillResponse(skill),
    );
    this.roadMaps = get([], 'roadMaps', jsonObject).map(
      (roadMap: object) => new SkillRoadMapResponse(roadMap),
    );
    this.resources = get([], 'resources', jsonObject).map(
      (resource: object) => new SkillResourceResponse(resource),
    );
    this.hasChildren = skillsHierarchies.some(({ parentId }) => parentId === this.id);
    this.hasParent = skillsHierarchies.some(({ childId }) => childId === this.id);
  }
}
