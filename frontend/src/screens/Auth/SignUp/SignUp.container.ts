import { connect } from 'react-redux';
import { IThunkDispatch } from '../../../shared/types';
import { IStore } from '../../../store/rootReducers';
import { SignUp } from './SignUp';
import { DispatchProps, StateProps, ISignUpForm } from './SignUp.types';
import { doSignUp } from '../../../app/auth/auth.actions';
import { selectAuthIsMakingRequest } from '../../../app/auth/auth.selectors';

const mapStateToProps = (state: IStore): StateProps => {
  return {
    isMakingRequest: selectAuthIsMakingRequest(state),
  };
};

const mapDispatchToProps = (dispatch: IThunkDispatch): DispatchProps => {
  return {
    doSignUp: (signUpForm: ISignUpForm) => {
      dispatch(doSignUp(signUpForm));
    },
  };
};
const connected = connect(mapStateToProps, mapDispatchToProps)(SignUp);

export { connected as SignUpContainer };
