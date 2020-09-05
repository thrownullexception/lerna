import { connect } from 'react-redux';
import { IThunkDispatch } from '../../../../shared/types';
import { IStore } from '../../../../store/rootReducers';
import { StudentSessionDetails } from './StudentSessionDetails';
import { DispatchProps, StateProps } from './StudentSessionDetails.types';
import { SessionsActions } from '../../../../app/sessions/sessions.actions';
import { SessionsSelectors } from '../../../../app/sessions/sessions.selectors';

export const StudentSessionDetailsContainer = connect(
  (state: IStore): StateProps => ({
    studentSessionDetails: SessionsSelectors.selectStudentSessionDetails(state),
  }),
  (dispatch: IThunkDispatch): DispatchProps => ({
    fetchStudentSessionDetails: (sessionId: string) =>
      dispatch(SessionsActions.fetchStudentSessionDetails(sessionId)),
  }),
)(StudentSessionDetails) as React.ComponentType;
