import { createSelector } from 'reselect';
import { IStore } from '../../store/rootReducers';
import { TutorSkillResponse, SkillLevelResponse } from './responses';

export class TutorSkillsSelectors {
  static base(state: IStore) {
    return state.tutorSkills;
  }

  static selectTutorSkills(state: IStore): TutorSkillResponse[] {
    return createSelector(TutorSkillsSelectors.base, ({ tutorSkills }) => {
      return tutorSkills;
    })(state);
  }

  static selectSkillLevels(state: IStore): SkillLevelResponse[] {
    return createSelector(TutorSkillsSelectors.base, ({ skillLevels }) => {
      return skillLevels;
    })(state);
  }
}
