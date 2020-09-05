import { connect } from 'react-redux';
import { IThunkDispatch } from '../../../shared/types';
import { IStore } from '../../../store/rootReducers';
import { CreateSession } from './CreateSession';
import { DispatchProps, StateProps, ICreateSessionForm } from './CreateSession.types';
import { RequestStatusSelectors } from '../../../app/request-status/request-status.selectors';
import { SessionsActions } from '../../../app/sessions/sessions.actions';
import { SkillsLevelsSelectors } from '../../../app/skill-levels/skill-levels.selectors';
import { SkillsSelectors } from '../../../app/skills/skills.selectors';
import { SkillsActions } from '../../../app/skills/skills.actions';
import { SkillLevelsActions } from '../../../app/skill-levels/skill-levels.actions';

export const CreateSessionContainer = connect(
  (state: IStore): StateProps => ({
    isMakingFormRequest: RequestStatusSelectors.selectIsMakingFormRequest(state),
    skillsWithNoChildren: SkillsSelectors.selectSkillsWithNoChildrenList(state),
    skillLevels: SkillsLevelsSelectors.selectSkillLevels(state),
  }),
  (dispatch: IThunkDispatch): DispatchProps => ({
    createSession: (createSessionForm: ICreateSessionForm) =>
      dispatch(SessionsActions.createSession(createSessionForm)),
    getSkillLevels: () => dispatch(SkillLevelsActions.getSkillLevels()),
    getSkillsWithNoChildrenList: () => dispatch(SkillsActions.getSkillsWithNoChildrenList()),
  }),
)(CreateSession) as React.ComponentType;
