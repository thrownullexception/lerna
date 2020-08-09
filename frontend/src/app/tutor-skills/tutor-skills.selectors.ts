import { createSelector } from 'reselect';
import { IStore } from '../../store/rootReducers';
import { TutorSkillResponse } from './responses';

export class TutorSkillsSelectors {
  static base(state: IStore) {
    return state.tutorSkills;
  }

  static selectTutorSkills(state: IStore): TutorSkillResponse[] {
    return createSelector(TutorSkillsSelectors.base, ({ tutorSkills }) => {
      return tutorSkills;
    })(state);
  }
}
