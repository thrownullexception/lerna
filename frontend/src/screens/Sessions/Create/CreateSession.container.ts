import { connect } from 'react-redux';
import { IThunkDispatch } from '../../../shared/types';
import { IStore } from '../../../store/rootReducers';
import { CreateSession } from './CreateSession';
import { DispatchProps, StateProps, ICreateSessionForm } from './CreateSession.types';
import { RequestStatusSelectors } from '../../../app/request-status/request-status.selectors';
import { SessionsActions } from '../../../app/sessions/sessions.actions';

const mapStateToProps = (state: IStore): StateProps => {
  return {
    isMakingRequest: RequestStatusSelectors.selectIsMakingFormRequest(state),
  };
};

const mapDispatchToProps = (dispatch: IThunkDispatch): DispatchProps => {
  return {
    createSession: (createSessionForm: ICreateSessionForm) => {
      dispatch(SessionsActions.createSession(createSessionForm));
    },
  };
};
const connected = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateSession) as React.ComponentType;

export { connected as CreateSessionContainer };
