import { createSelector } from 'reselect';
import { IStore } from '../../store/rootReducers';
import { SkillResponse } from './responses';

export class SkillsSelectors {
  static base(state: IStore) {
    return state.skills;
  }

  static selectIsFetching(state: IStore) {
    return createSelector(SkillsSelectors.base, ({ isFetching }) => isFetching)(state);
  }

  static selectSkillsHierarchies(state: IStore) {
    return createSelector(SkillsSelectors.base, ({ hierarchies }) => {
      return hierarchies;
    })(state);
  }

  static selectSkillsInHierarchy(state: IStore) {
    return createSelector(
      [SkillsSelectors.base, SkillsSelectors.selectSkillsHierarchies],
      ({ skills, currentSkillId }, hierarchies) => {
        if (!currentSkillId) {
          return skills.filter(({ hasParent }) => !hasParent);
        }
        const childrenSkills = hierarchies
          .filter(({ parentId }) => parentId === currentSkillId)
          .map(({ childId }) => childId);
        return skills.filter(({ id }) => childrenSkills.includes(id));
      },
    )(state);
  }

  static selectCurrentSkill(state: IStore): SkillResponse {
    return createSelector(SkillsSelectors.base, ({ currentSkill, currentSkillId, skills }) => {
      if (currentSkill.id === currentSkillId) {
        return currentSkill;
      }
      const skill = skills.find(({ id }) => id === currentSkillId);
      if (skill) {
        return skill;
      }

      return currentSkill;
    })(state);
  }

  static selectSkillsDepth(state: IStore) {
    return createSelector(SkillsSelectors.base, ({ skillsDepth }) => {
      return skillsDepth;
    })(state);
  }
}
