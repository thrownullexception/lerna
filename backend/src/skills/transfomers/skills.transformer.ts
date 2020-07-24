import { Skill } from '../skills.entity';
import { SkillResourceTransformer } from '../../skill-resources/skill-resources.transformer';
import { SkillRoadMapTransformer } from '../../skill-road-maps/skill-road-maps.types';

export class SkillTransformer {
  id: string;
  name: string;
  description: string;
  isPath: boolean;
  resources: SkillResourceTransformer[];
  roadMaps: SkillRoadMapTransformer[];
  relatedSkills: SkillTransformer[];

  constructor(skill: Skill, fullDetails?: boolean) {
    this.id = skill.id;
    this.name = skill.name;
    this.isPath = skill.isPath;
    if (fullDetails) {
      this.description = skill.description;
      this.resources = skill.resources.map(resource => new SkillResourceTransformer(resource));
      this.roadMaps = skill.roadMaps.map(roadMap => new SkillRoadMapTransformer(roadMap));
      this.relatedSkills = [...skill.backwardRelatedSkill, ...skill.forwardRelatedSkill].map(
        skill => new SkillTransformer(skill),
      );
    }
  }
}
