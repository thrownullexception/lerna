import { connect } from 'react-redux';
import { IThunkDispatch } from '../../../shared/types';
import { IStore } from '../../../store/rootReducers';
import { TutorSessions } from './TutorSessions';
import { DispatchProps, StateProps } from './TutorSessions.types';
import { SessionsActions } from '../../../app/sessions/sessions.actions';
import { SessionsSelectors } from '../../../app/sessions/sessions.selectors';
import { Cursor } from '../../../app/types';

export const TutorSessionsContainer = connect(
  (state: IStore): StateProps => ({
    tutorSessionsCursor: SessionsSelectors.selectTutorSessionCursor(state),
    tutorSessionsData: SessionsSelectors.selectTutorSessionsData(state),
  }),
  (dispatch: IThunkDispatch): DispatchProps => ({
    fetchTutorSessions: (cursor: Cursor) => {
      dispatch(SessionsActions.fetchTutorSessions(cursor));
    },
  }),
)(TutorSessions) as React.ComponentType;
