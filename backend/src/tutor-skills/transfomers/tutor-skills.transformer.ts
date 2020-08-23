import { TutorSkill } from '../tutor-skills.entity';
import { SkillLevels } from '../../skill-levels/skill-levels.types';

export class TutorSkillTransformer {
  id: string;
  skillId: string;
  levelSystemName: SkillLevels;
  levelDisplayName: string;
  rate: number;
  years: number;
  skillName: string;

  constructor(tutorSkill: TutorSkill) {
    this.id = tutorSkill.id;
    this.skillId = tutorSkill.skillId;
    this.levelSystemName = tutorSkill.levelSystemName;
    this.levelDisplayName = tutorSkill.level.displayName;
    this.rate = tutorSkill.rate;
    this.years = tutorSkill.years;
    this.skillName = tutorSkill.skill.name;
  }
}
