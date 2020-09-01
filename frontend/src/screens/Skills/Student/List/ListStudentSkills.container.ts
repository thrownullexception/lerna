import { connect } from 'react-redux';
import { IStore } from '../../../../store/rootReducers';
import { DispatchProps, StateProps } from './ListStudentSkills.types';
import { IThunkDispatch } from '../../../../shared/types';
import { ListStudentSkills } from './ListStudentSkills';
import { StudentSkillsSelectors } from '../../../../app/student-skills/student-skills.selectors';
import { SkillsActions } from '../../../../app/skills/skills.actions';
import { StudentSkillsActions } from '../../../../app/student-skills/student-skills.actions';
import { SkillsPresentationMode } from '../../../../app/student-skills/student-skills.types';

export const ListStudentSkillsContainer = connect(
  (state: IStore): StateProps => ({
    skillsListToPresent: StudentSkillsSelectors.selectSkillsListToPresent(state),
    skillInHierarchy: StudentSkillsSelectors.selectSkillInHierarchy(state),
    currentStudentSkill: StudentSkillsSelectors.selectCurrentStudentSkill(state),
    skillsBreadCrumbs: StudentSkillsSelectors.getSkillsBreadCrumbs(state),
    favouriteSkillIds: StudentSkillsSelectors.selectFavouriteSkillIds(state),
    completedRoadMapIds: StudentSkillsSelectors.selectCompletedRoadMapIds(state),
    skillPresentationMode: StudentSkillsSelectors.selectSkillPresentationMode(state),
  }),
  (dispatch: IThunkDispatch): DispatchProps => ({
    getSkillsWithHeirarchies: () => dispatch(StudentSkillsActions.getSkillHeirarchies()),
    getSkillsList: () => dispatch(SkillsActions.getSkillsList()),
    getMyFavouriteSkillsAndCompletedRoadMaps: () =>
      dispatch(StudentSkillsActions.getMyFavouriteSkillsAndCompletedRoadMaps()),
    toggleSkillFavouritism: (skillId: string, isFavourite: boolean) =>
      dispatch(StudentSkillsActions.toggleSkillFavouritism(skillId, isFavourite)),
    getStudentSkill: (skillId: string) =>
      dispatch(StudentSkillsActions.getStudentSkillDetails(skillId)),
    changeSkillPresentationMode: (skillPresentationMode: SkillsPresentationMode) =>
      dispatch(StudentSkillsActions.changeSkillPresentationMode(skillPresentationMode)),
    goBackInSkillsDepth: () => dispatch(StudentSkillsActions.goBackInSkillsDepth()),
    setCurrentSkillId: (skillId: string) =>
      dispatch(StudentSkillsActions.setCurrentSkillId(skillId)),
  }),
)(ListStudentSkills) as React.ComponentType;
