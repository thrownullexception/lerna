import { Skill } from '../skills.entity';

export class SkillListTransformer {
  id: string;
  name: string;
  constructor(skill: Skill) {
    this.id = skill.id;
    this.name = skill.name;
  }
}
