import { createSelector } from 'reselect';
import { IStore } from '../../store/rootReducers';
import { SkillLevelResponse } from './responses';

export class SkillsLevelsSelectors {
  static base(state: IStore) {
    return state.skillLevels;
  }

  static selectSkillLevels(state: IStore): SkillLevelResponse[] {
    return createSelector(SkillsLevelsSelectors.base, ({ skillLevels }) => {
      return skillLevels;
    })(state);
  }
}
