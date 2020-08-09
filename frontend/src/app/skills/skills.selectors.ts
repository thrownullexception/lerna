import { createSelector } from 'reselect';
import { IStore } from '../../store/rootReducers';
import { SkillListResponse } from './responses';

export class SkillsSelectors {
  static base(state: IStore) {
    return state.skills;
  }

  static selectSkillsList(state: IStore): SkillListResponse[] {
    return createSelector(SkillsSelectors.base, ({ skillsList }) => {
      return skillsList;
    })(state);
  }
}
