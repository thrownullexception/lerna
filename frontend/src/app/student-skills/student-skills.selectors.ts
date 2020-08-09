import { createSelector } from 'reselect';
import { IStore } from '../../store/rootReducers';
import { SkillHierarchyResponse, StudentSkillDetailResponse } from './responses';
import { SkillsPresentationMode, ISkillListToPresent } from './student-skills.types';
import { SkillListResponse } from '../skills/responses';
import { SkillsSelectors } from '../skills/skills.selectors';

export class StudentSkillsSelectors {
  static base(state: IStore) {
    return state.studentSkills;
  }

  static selectSkillsHierarchies(state: IStore): SkillHierarchyResponse[] {
    return createSelector(StudentSkillsSelectors.base, ({ hierarchies }) => {
      return hierarchies;
    })(state);
  }

  static selectFavouriteSkillIds(state: IStore): string[] {
    return createSelector(StudentSkillsSelectors.base, ({ favouriteSkillIds }) => {
      return favouriteSkillIds;
    })(state);
  }

  static selectCompletedRoadMapIds(state: IStore): string[] {
    return createSelector(StudentSkillsSelectors.base, ({ completedRoadMapIds }) => {
      return completedRoadMapIds;
    })(state);
  }

  static selectSkillPresentationMode(state: IStore): SkillsPresentationMode {
    return createSelector(StudentSkillsSelectors.base, ({ skillPresentationMode }) => {
      return skillPresentationMode;
    })(state);
  }

  static selectSkillIdsToPresent(state: IStore): string[] {
    return createSelector(
      [
        StudentSkillsSelectors.selectCurrentSkillDetailsId,
        SkillsSelectors.selectSkillsList,
        StudentSkillsSelectors.selectSkillsHierarchies,
        StudentSkillsSelectors.selectFavouriteSkillIds,
        StudentSkillsSelectors.selectSkillPresentationMode,
      ],
      (
        currentSkillDetailsId,
        skillsList,
        hierarchies,
        favouriteSkillIds,
        skillPresentationMode,
      ) => {
        if (skillPresentationMode === SkillsPresentationMode.Favourites) {
          return favouriteSkillIds;
        }
        if (!currentSkillDetailsId) {
          const skillsAsChildrenIds = hierarchies.map(({ childId }) => childId);

          return skillsList
            .filter(({ id }) => !skillsAsChildrenIds.includes(id))
            .map(({ id }) => id);
        }
        return hierarchies
          .filter(({ parentId }) => parentId === currentSkillDetailsId)
          .map(({ childId }) => childId);
      },
    )(state);
  }

  static selectSkillsListToPresent(state: IStore): ISkillListToPresent[] {
    return createSelector(
      [
        StudentSkillsSelectors.selectSkillIdsToPresent,
        StudentSkillsSelectors.selectSkillsHierarchies,
        SkillsSelectors.selectSkillsList,
      ],
      (skillIdsToPresent, hierarchies, skillsList) => {
        return skillsList
          .filter(({ id }) => skillIdsToPresent.includes(id))
          .map(skill => {
            const hasChildren = hierarchies.some(({ parentId }) => parentId === skill.id);
            return { ...skill, hasChildren };
          });
      },
    )(state);
  }

  static selectSkillInHierarchy(state: IStore): SkillListResponse {
    return createSelector(
      [StudentSkillsSelectors.selectCurrentSkillDetailsId, SkillsSelectors.selectSkillsList],
      (currentSkillDetailsId, skillsList) => {
        const skill = skillsList.find(({ id }) => id === currentSkillDetailsId);
        if (skill) {
          return skill;
        }

        return new SkillListResponse({});
      },
    )(state);
  }

  static selectCurrentSkillDetailsId(state: IStore): string {
    return createSelector(StudentSkillsSelectors.base, ({ currentSkillDetailsId }) => {
      return currentSkillDetailsId;
    })(state);
  }

  static selectCurrentStudentSkill(state: IStore): StudentSkillDetailResponse {
    return createSelector(StudentSkillsSelectors.base, ({ currentSkillDetails }) => {
      return currentSkillDetails;
    })(state);
  }

  static getSkillsBreadCrumbs(state: IStore): SkillListResponse[] {
    return createSelector(
      [StudentSkillsSelectors.selectSkillsDepth, SkillsSelectors.selectSkillsList],
      (skillsDepth, skillsList) => {
        return skillsList.filter(({ id }) => skillsDepth.includes(id));
      },
    )(state);
  }

  static selectSkillsDepth(state: IStore): string[] {
    return createSelector(StudentSkillsSelectors.base, ({ skillsDepth }) => {
      return skillsDepth;
    })(state);
  }
}
