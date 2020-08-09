import { Skill } from '../skills.entity';
import { SkillResourceTransformer } from '../../skill-resources/transformers';
import { SkillRoadMapTransformer } from '../../skill-road-maps/transformers';
import { SkillListTransformer } from './skill-list.transformer';

export class SkillDetailsTransformer {
  id: string;
  name: string;
  description: string;
  resources: SkillResourceTransformer[];
  roadMaps: SkillRoadMapTransformer[];
  relatedSkills: SkillListTransformer[];

  constructor(skill: Skill) {
    this.id = skill.id;
    this.name = skill.name;
    this.description = skill.description;
    this.resources = skill.resources.map(resource => new SkillResourceTransformer(resource));
    this.roadMaps = skill.roadMaps.map(roadMap => new SkillRoadMapTransformer(roadMap));
    this.relatedSkills = [...skill.backwardRelatedSkill, ...skill.forwardRelatedSkill].map(
      skill => new SkillListTransformer(skill),
    );
  }
}
