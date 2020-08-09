import { createSelector } from 'reselect';
import { IStore } from '../../store/rootReducers';
import { SkillListResponse, SkillWithNoChildrenResponse } from './responses';

export class SkillsSelectors {
  static base(state: IStore) {
    return state.skills;
  }

  static selectSkillsList(state: IStore): SkillListResponse[] {
    return createSelector(SkillsSelectors.base, ({ skillsList }) => {
      return skillsList;
    })(state);
  }

  static selectSkillsWithNoChildrenList(state: IStore): SkillWithNoChildrenResponse[] {
    return createSelector(SkillsSelectors.base, ({ skillsWithNoChildrenList }) => {
      return skillsWithNoChildrenList;
    })(state);
  }
}
