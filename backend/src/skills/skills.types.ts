import { Skill } from './skills.entity';
import { ISelectOptions } from '../shared/types';

export interface ISkillWithRestAsOptions {
  skill: Skill;
  skills: ISelectOptions[];
}

export interface IMySkillActions {
  completedRoadMaps: string[];
  favouriteSkills: string[];
}
