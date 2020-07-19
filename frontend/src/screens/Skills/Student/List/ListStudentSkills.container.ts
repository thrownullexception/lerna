import { connect } from 'react-redux';
import { IStore } from '../../../../store/rootReducers';
import { DispatchProps, StateProps } from './ListStudentSkills.types';
import { IThunkDispatch } from '../../../../shared/types';
import { ListStudentSkills } from './ListStudentSkills';
import { SkillsSelectors } from '../../../../app/skills/skills.selectors';
import { SkillActions } from '../../../../app/skills/skills.actions';

const mapStateToProps = (state: IStore): StateProps => {
  return {
    skills: SkillsSelectors.selectSkillsInHierarchy(state),
    skillInHierarchy: SkillsSelectors.selectSkillInHierarchy(state),
    skill: SkillsSelectors.selectCurrentStudentSkill(state),
    skillsDepth: SkillsSelectors.selectSkillsDepth(state),
  };
};

const mapDispatchToProps = (dispatch: IThunkDispatch): DispatchProps => {
  return {
    getSkillsWithHeirarchies: () => {
      dispatch(SkillActions.getSkillsWithHeirarchies());
    },
    getStudentSkill: (skillId: string) => {
      dispatch(SkillActions.getStudentSkill(skillId));
    },
    goBackInSkillsDepth: () => {
      dispatch(SkillActions.goBackInSkillsDepth());
    },
    setCurrentSkillId: (skillId: string) => {
      dispatch(SkillActions.setCurrentSkillId(skillId));
    },
  };
};

const connected = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ListStudentSkills) as React.ComponentType;

export { connected as ListStudentSkillsContainer };
