import { connect } from 'react-redux';
import { IThunkDispatch } from '../../../../shared/types';
import { IStore } from '../../../../store/rootReducers';
import { TutorSessionDetails } from './TutorSessionDetails';
import { DispatchProps, StateProps } from './TutorSessionDetails.types';
import { SessionsActions } from '../../../../app/sessions/sessions.actions';
import { SessionsSelectors } from '../../../../app/sessions/sessions.selectors';

export const TutorSessionDetailsContainer = connect(
  (state: IStore): StateProps => ({
    tutorSessionDetails: SessionsSelectors.selectTutorSessionDetails(state),
  }),
  (dispatch: IThunkDispatch): DispatchProps => ({
    fetchTutorSessionDetails: (sessionId: string) =>
      dispatch(SessionsActions.fetchTutorSessionDetails(sessionId)),
  }),
)(TutorSessionDetails) as React.ComponentType;
