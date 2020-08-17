import { connect } from 'react-redux';
import { IThunkDispatch } from '../../../../shared/types';
import { IStore } from '../../../../store/rootReducers';
import { TutorSessionDetails } from './TutorSessionDetails';
import { DispatchProps, StateProps } from './TutorSessionDetails.types';
import { SessionsActions } from '../../../../app/sessions/sessions.actions';
import { SessionsSelectors } from '../../../../app/sessions/sessions.selectors';

const mapStateToProps = (state: IStore): StateProps => {
  return {
    tutorSessionDetails: SessionsSelectors.selectTutorSessionDetails(state),
  };
};

const mapDispatchToProps = (dispatch: IThunkDispatch): DispatchProps => ({
  fetchTutorSessionDetails: (sessionId: string) =>
    dispatch(SessionsActions.fetchTutorSessionDetails(sessionId)),
});

const connected = connect(
  mapStateToProps,
  mapDispatchToProps,
)(TutorSessionDetails) as React.ComponentType;

export { connected as TutorSessionDetailsContainer };
