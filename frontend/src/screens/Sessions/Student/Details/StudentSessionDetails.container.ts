import { connect } from 'react-redux';
import { IThunkDispatch } from '../../../../shared/types';
import { IStore } from '../../../../store/rootReducers';
import { StudentSessionDetails } from './StudentSessionDetails';
import { DispatchProps, StateProps } from './StudentSessionDetails.types';
import { SessionsActions } from '../../../../app/sessions/sessions.actions';
import { SessionsSelectors } from '../../../../app/sessions/sessions.selectors';

const mapStateToProps = (state: IStore): StateProps => {
  return {
    studentSessionDetails: SessionsSelectors.selectStudentSessionDetails(state),
  };
};

const mapDispatchToProps = (dispatch: IThunkDispatch): DispatchProps => ({
  fetchStudentSessionDetails: (sessionId: string) =>
    dispatch(SessionsActions.fetchStudentSessionDetails(sessionId)),
});

const connected = connect(
  mapStateToProps,
  mapDispatchToProps,
)(StudentSessionDetails) as React.ComponentType;

export { connected as StudentSessionDetailsContainer };
