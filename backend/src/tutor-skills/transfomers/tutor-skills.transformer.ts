import { TutorSkill } from '../tutor-skills.entity';
import { TutorSkillLevels } from 'src/tutor-skill-levels/tutor-skill-levels.types';
import { TutorSkillLevel } from 'src/tutor-skill-levels/tutor-skill-levels.entity';

export class TutorSkillTransformer {
  id: string;
  skillId: string;
  level: TutorSkillLevels;
  levelName: string;
  rate: number;
  years: number;
  skillName: string;

  constructor(tutorSkill: TutorSkill, tutorSkillLevels: TutorSkillLevel[]) {
    this.id = tutorSkill.id;
    this.skillId = tutorSkill.skillId;
    this.level = tutorSkill.level;
    this.levelName = tutorSkillLevels.find(
      ({ systemName }) => systemName === tutorSkill.level,
    )?.displayName; // Play with this `?`
    this.rate = tutorSkill.rate;
    this.years = tutorSkill.years;
    this.skillName = tutorSkill.skill.name;
  }
}
