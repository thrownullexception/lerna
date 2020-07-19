import { createSelector } from 'reselect';
import { IStore } from '../../store/rootReducers';
import { SkillResponse } from './responses';

export class SkillsSelectors {
  static base(state: IStore) {
    return state.skills;
  }

  static selectSkillsHierarchies(state: IStore) {
    return createSelector(SkillsSelectors.base, ({ hierarchies }) => {
      return hierarchies;
    })(state);
  }

  static selectSkillsInHierarchy(state: IStore) {
    return createSelector(
      [SkillsSelectors.base, SkillsSelectors.selectSkillsHierarchies],
      ({ skills, currentStudentSkillId }, hierarchies) => {
        if (!currentStudentSkillId) {
          return skills.filter(({ hasParent }) => !hasParent);
        }
        const childrenSkills = hierarchies
          .filter(({ parentId }) => parentId === currentStudentSkillId)
          .map(({ childId }) => childId);
        return skills.filter(({ id }) => childrenSkills.includes(id));
      },
    )(state);
  }

  static selectSkillInHierarchy(state: IStore): SkillResponse {
    return createSelector(SkillsSelectors.base, ({ currentStudentSkillId, skills }) => {
      const skill = skills.find(({ id }) => id === currentStudentSkillId);
      if (skill) {
        return skill;
      }

      return new SkillResponse({});
    })(state);
  }

  static selectCurrentStudentSkill(state: IStore) {
    return createSelector(SkillsSelectors.base, ({ studentSkill }) => {
      return studentSkill;
    })(state);
  }

  static selectSkillsDepth(state: IStore) {
    return createSelector(SkillsSelectors.base, ({ skillsDepth }) => {
      return skillsDepth;
    })(state);
  }
}
