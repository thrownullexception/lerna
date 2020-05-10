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
    skill: SkillsSelectors.selectCurrentSkill(state),
    skillsDepth: SkillsSelectors.selectSkillsDepth(state),
    isFetching: SkillsSelectors.selectIsFetching(state),
  };
};

const mapDispatchToProps = (dispatch: IThunkDispatch): DispatchProps => {
  return {
    getSkills: () => {
      dispatch(SkillActions.getSkills());
    },
    getSkill: (skillId: string) => {
      dispatch(SkillActions.getSkill(skillId));
    },
    goBackInSkillsDepth: () => {
      dispatch(SkillActions.goBackInSkillsDepth());
    },
  };
};
const connected = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ListStudentSkills) as React.ComponentType;

export { connected as ListStudentSkillsContainer };
