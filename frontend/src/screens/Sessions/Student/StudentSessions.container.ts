import { connect } from 'react-redux';
import { IThunkDispatch } from '../../../shared/types';
import { IStore } from '../../../store/rootReducers';
import { StudentSessions } from './StudentSessions';
import { DispatchProps, StateProps } from './StudentSessions.types';
import { SessionsActions } from '../../../app/sessions/sessions.actions';
import { SessionsSelectors } from '../../../app/sessions/sessions.selectors';
import { Cursor } from '../../../app/types';

const mapStateToProps = (state: IStore): StateProps => {
  return {
    studentSessionsCursor: SessionsSelectors.selectStudentSessionCursor(state),
    studentSessionsData: SessionsSelectors.selectStudentSessionsData(state),
  };
};

const mapDispatchToProps = (dispatch: IThunkDispatch): DispatchProps => {
  return {
    fetchStudentSessions: (cursor: Cursor) => {
      dispatch(SessionsActions.fetchStudentSessions(cursor));
    },
  };
};
const connected = connect(
  mapStateToProps,
  mapDispatchToProps,
)(StudentSessions) as React.ComponentType;

export { connected as StudentSessionsContainer };
