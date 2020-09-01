import { connect } from 'react-redux';
import { IThunkDispatch } from '../../../shared/types';
import { IStore } from '../../../store/rootReducers';
import { StudentSessions } from './StudentSessions';
import { DispatchProps, StateProps } from './StudentSessions.types';
import { SessionsActions } from '../../../app/sessions/sessions.actions';
import { SessionsSelectors } from '../../../app/sessions/sessions.selectors';
import { Cursor } from '../../../app/types';
import { RequestStatusSelectors } from '../../../app/request-status/request-status.selectors';

export const StudentSessionsContainer = connect(
  (state: IStore): StateProps => ({
    studentSessionsCursor: SessionsSelectors.selectStudentSessionCursor(state),
    studentSessionsData: SessionsSelectors.selectStudentSessionsData(state),
    isMakingDataRequest: RequestStatusSelectors.selectIsMakingDataRequest(state),
  }),
  (dispatch: IThunkDispatch): DispatchProps => ({
    fetchStudentSessions: (cursor: Cursor) => {
      dispatch(SessionsActions.fetchStudentSessions(cursor));
    },
  }),
)(StudentSessions) as React.ComponentType;
