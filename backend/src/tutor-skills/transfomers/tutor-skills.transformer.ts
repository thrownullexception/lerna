import { TutorSkill } from '../tutor-skills.entity';
import { SkillLevels } from '../../skill-levels/skill-levels.types';
import { SkillLevel } from '../../skill-levels/skill-levels.entity';

export class TutorSkillTransformer {
  id: string;
  skillId: string;
  level: SkillLevels;
  levelName: string;
  rate: number;
  years: number;
  skillName: string;

  constructor(tutorSkill: TutorSkill, skillLevels: SkillLevel[]) {
    this.id = tutorSkill.id;
    this.skillId = tutorSkill.skillId;
    this.level = tutorSkill.level;
    this.levelName = skillLevels.find(
      ({ systemName }) => systemName === tutorSkill.level,
    )?.displayName; // Play with this `?`
    this.rate = tutorSkill.rate;
    this.years = tutorSkill.years;
    this.skillName = tutorSkill.skill.name;
  }
}
