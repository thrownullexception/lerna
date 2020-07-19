import { connect } from 'react-redux';
import { IThunkDispatch } from '../../../shared/types';
import { IStore } from '../../../store/rootReducers';
import { CreateSession } from './CreateSession';
import { DispatchProps, StateProps, ICreateSessionForm } from './CreateSession.types';
import { FormSelectors } from '../../../app/forms/forms.selectors';
import { SessionsActions } from '../../../app/sessions/sessions.actions';

const mapStateToProps = (state: IStore): StateProps => {
  return {
    isMakingRequest: FormSelectors.selectIsMakingFormRequest(state),
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
