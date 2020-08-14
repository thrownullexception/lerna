import { connect } from 'react-redux';
import { IStore } from '../../../../store/rootReducers';
import { DispatchProps, StateProps, ITutorSkillForm } from './ListTutorSkills.types';
import { IThunkDispatch } from '../../../../shared/types';
import { ListTutorSkills } from './ListTutorSkills';
import { TutorSkillsActions } from '../../../../app/tutor-skills/tutor-skills.actions';
import { TutorSkillsSelectors } from '../../../../app/tutor-skills/tutor-skills.selectors';
import { RequestStatusSelectors } from '../../../../app/request-status/request-status.selectors';
import { SkillsActions } from '../../../../app/skills/skills.actions';
import { SkillsSelectors } from '../../../../app/skills/skills.selectors';

const mapStateToProps = (state: IStore): StateProps => {
  return {
    tutorSkills: TutorSkillsSelectors.selectTutorSkills(state),
    isMakingFormRequest: RequestStatusSelectors.selectIsMakingFormRequest(state),
    skillLevels: TutorSkillsSelectors.selectSkillLevels(state),
    skillsWithNoChildren: SkillsSelectors.selectSkillsWithNoChildrenList(state),
  };
};

const mapDispatchToProps = (dispatch: IThunkDispatch): DispatchProps => {
  return {
    getTutorSkills: () => dispatch(TutorSkillsActions.getTutorSkills()),
    deleteTutorSkill: (tutorSkillId: string) =>
      dispatch(TutorSkillsActions.deleteTutorSkill(tutorSkillId)),
    getSkillsWithNoChildrenList: () => dispatch(SkillsActions.getSkillsWithNoChildrenList()),
    getSkillLevels: () => dispatch(TutorSkillsActions.getSkillLevels()),
    createTutorSkill: (tutorSkill: ITutorSkillForm) =>
      dispatch(TutorSkillsActions.createTutorSkill(tutorSkill)),
    updateTutorSkill: (tutorSkill: ITutorSkillForm) =>
      dispatch(TutorSkillsActions.updateTutorSkill(tutorSkill)),
  };
};

const connected = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ListTutorSkills) as React.ComponentType;

export { connected as ListTutorSkillsContainer };
