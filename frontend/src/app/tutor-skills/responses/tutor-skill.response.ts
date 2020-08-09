import get from 'lodash-es/get';
import { TutorSkillLevels } from '../tutor-skills.types';

export class TutorSkillResponse {
  id: string;
  skillId: string;
  level: TutorSkillLevels;
  levelName: string;
  rate: number;
  years: number;
  skillName: string;

  constructor(jsonObject: object) {
    this.id = get(jsonObject, 'id');
    this.skillId = get(jsonObject, 'skillId');
    this.level = get(jsonObject, 'level');
    this.levelName = get(jsonObject, 'levelName');
    this.rate = get(jsonObject, 'rate');
    this.years = get(jsonObject, 'years');
    this.skillName = get(jsonObject, 'skillName');
  }
}
