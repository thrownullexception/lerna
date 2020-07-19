import { connect } from 'react-redux';
import { IThunkDispatch } from '../../../shared/types';
import { IStore } from '../../../store/rootReducers';
import { TutorSessions } from './TutorSessions';
import { DispatchProps, StateProps } from './TutorSessions.types';
import { SessionsActions } from '../../../app/sessions/sessions.actions';
import { SessionsSelectors } from '../../../app/sessions/sessions.selectors';
import { Cursor } from '../../../app/types';

const mapStateToProps = (state: IStore): StateProps => {
  return {
    tutorSessionsCursor: SessionsSelectors.selectTutorSessionCursor(state),
    tutorSessionsData: SessionsSelectors.selectTutorSessionsData(state),
  };
};

const mapDispatchToProps = (dispatch: IThunkDispatch): DispatchProps => {
  return {
    fetchTutorSessions: (cursor: Cursor) => {
      dispatch(SessionsActions.fetchTutorSessions(cursor));
    },
  };
};
const connected = connect(
  mapStateToProps,
  mapDispatchToProps,
)(TutorSessions) as React.ComponentType;

export { connected as TutorSessionsContainer };
