import { connect } from 'react-redux';
import { IStore } from '../../../../store/rootReducers';
import { DispatchProps, StateProps } from './ListTutorSkills.types';
import { IThunkDispatch } from '../../../../shared/types';
import { ListTutorSkills } from './ListTutorSkills';
import { TutorSkillsActions } from '../../../../app/tutor-skills/tutor-skills.actions';
import { TutorSkillsSelectors } from '../../../../app/tutor-skills/tutor-skills.selectors';

const mapStateToProps = (state: IStore): StateProps => {
  return {
    tutorSkills: TutorSkillsSelectors.selectTutorSkills(state),
  };
};

const mapDispatchToProps = (dispatch: IThunkDispatch): DispatchProps => {
  return {
    getTutorSkills: () => dispatch(TutorSkillsActions.getTutorSkills()),
  };
};

const connected = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ListTutorSkills) as React.ComponentType;

export { connected as ListTutorSkillsContainer };
