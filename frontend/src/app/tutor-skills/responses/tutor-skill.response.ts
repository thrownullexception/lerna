import get from 'lodash/get';
import { IStore } from '../../../store/rootReducers';
import { SkillsSelectors } from '../../skills/skills.selectors';
import { SkillsLevelsSelectors } from '../../skill-levels/skill-levels.selectors';

export class TutorSkillResponse {
  id: string;
  skillId: string;
  level: string;
  levelName: string;
  rate: number;
  years: number;
  skillName: string;

  constructor(jsonObject: object, state?: IStore) {
    this.id = get(jsonObject, 'id');
    this.skillId = get(jsonObject, 'skillId');
    this.level = get(jsonObject, 'level');
    this.levelName = get(jsonObject, 'levelName');
    this.rate = get(jsonObject, 'rate');
    this.years = get(jsonObject, 'years');
    this.skillName = get(jsonObject, 'skillName');

    if (state) {
      const levels = SkillsLevelsSelectors.selectSkillLevels(state);
      this.levelName = '' + levels.find(({ systemName }) => systemName === this.level)?.displayName;

      const skills = SkillsSelectors.selectSkillsWithNoChildrenList(state);
      this.skillName = '' + skills.find(({ id }) => id === this.skillId)?.name;
    }
  }
}
