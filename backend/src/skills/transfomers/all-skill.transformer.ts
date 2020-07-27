import { Skill } from '../skills.entity';

export class AllSkillTransformer {
  id: string;
  name: string;
  constructor(skill: Skill) {
    this.id = skill.id;
    this.name = skill.name;
  }
}
