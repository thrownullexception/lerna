import get from 'lodash-es/get';
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
    this.id = get(jsonObject, 'id', '');
    this.isPath = get(jsonObject, 'isPath', '');
    this.name = get(jsonObject, 'name', '');
    this.description = get(jsonObject, 'description', '');
    this.relatedSkills = get(jsonObject, 'relatedSkills', []).map(
      (skill: object) => new SkillResponse(skill),
    );
    this.roadMaps = get(jsonObject, 'roadMaps', []).map(
      (roadMap: object) => new SkillRoadMapResponse(roadMap),
    );
    this.resources = get(jsonObject, 'resources', []).map(
      (resource: object) => new SkillResourceResponse(resource),
    );
    this.hasChildren = skillsHierarchies.some(({ parentId }) => parentId === this.id);
    this.hasParent = skillsHierarchies.some(({ childId }) => childId === this.id);
  }
}
