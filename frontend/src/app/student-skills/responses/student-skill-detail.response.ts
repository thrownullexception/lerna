import get from 'lodash-es/get';
import { SkillRoadMapResponse } from './skill-road-map.response';
import { SkillResourceResponse } from './skill-resource.response';
import { SkillListResponse } from '../../skills/responses';

export class StudentSkillDetailResponse {
  id: string;
  name: string;
  description: string;
  relatedSkills: SkillListResponse[];
  roadMaps: SkillRoadMapResponse[];
  resources: SkillResourceResponse[];

  constructor(jsonObject: object) {
    this.id = get(jsonObject, 'id', '');
    this.name = get(jsonObject, 'name', '');
    this.description = get(jsonObject, 'description', '');
    this.relatedSkills = get(jsonObject, 'relatedSkills', []).map(
      (skill: object) => new SkillListResponse(skill),
    );
    this.roadMaps = get(jsonObject, 'roadMaps', []).map(
      (roadMap: object) => new SkillRoadMapResponse(roadMap),
    );
    this.resources = get(jsonObject, 'resources', []).map(
      (resource: object) => new SkillResourceResponse(resource),
    );
  }
}
