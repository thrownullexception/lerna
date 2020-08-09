import { connect } from 'react-redux';
import { IStore } from '../../../../store/rootReducers';
import { DispatchProps, StateProps } from './ListStudentSkills.types';
import { IThunkDispatch } from '../../../../shared/types';
import { ListStudentSkills } from './ListStudentSkills';
import { StudentSkillsSelectors } from '../../../../app/student-skills/student-skills.selectors';
import { SkillsActions } from '../../../../app/skills/skills.actions';
import { StudentSkillsActions } from '../../../../app/student-skills/student-skills.actions';
import { SkillsPresentationMode } from '../../../../app/student-skills/student-skills.types';

const mapStateToProps = (state: IStore): StateProps => {
  return {
    skillsListToPresent: StudentSkillsSelectors.selectSkillsListToPresent(state),
    skillInHierarchy: StudentSkillsSelectors.selectSkillInHierarchy(state),
    currentStudentSkill: StudentSkillsSelectors.selectCurrentStudentSkill(state),
    skillsBreadCrumbs: StudentSkillsSelectors.getSkillsBreadCrumbs(state),
    favouriteSkillIds: StudentSkillsSelectors.selectFavouriteSkillIds(state),
    completedRoadMapIds: StudentSkillsSelectors.selectCompletedRoadMapIds(state),
    skillPresentationMode: StudentSkillsSelectors.selectSkillPresentationMode(state),
  };
};

const mapDispatchToProps = (dispatch: IThunkDispatch): DispatchProps => {
  return {
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
  };
};

const connected = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ListStudentSkills) as React.ComponentType;

export { connected as ListStudentSkillsContainer };
