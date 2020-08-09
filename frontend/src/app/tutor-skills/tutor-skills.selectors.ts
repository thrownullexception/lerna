import { createSelector } from 'reselect';
import { IStore } from '../../store/rootReducers';
import { TutorSkillResponse, TutorSkillLevelResponse } from './responses';

export class TutorSkillsSelectors {
  static base(state: IStore) {
    return state.tutorSkills;
  }

  static selectTutorSkills(state: IStore): TutorSkillResponse[] {
    return createSelector(TutorSkillsSelectors.base, ({ tutorSkills }) => {
      return tutorSkills;
    })(state);
  }

  static selectTutorSkillLevels(state: IStore): TutorSkillLevelResponse[] {
    return createSelector(TutorSkillsSelectors.base, ({ tutorSkillLevels }) => {
      return tutorSkillLevels;
    })(state);
  }
}
