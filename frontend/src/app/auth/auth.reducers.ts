import { produce } from 'immer';
import { IAuthState, AuthAction, ActionType, AccountModeType } from './auth.types';

const initial = {
  isAuthenticated: false,
  accountMode: AccountModeType.Student,
  email: '',
  id: '',
  profile: {
    lastName: '',
    firstName: '',
    picture: '',
  },
  permissions: [],
  role: '',
};

export const authReducer = (state: IAuthState = initial, action: AuthAction) => {
  return produce(state, draftState => {
    if (action.type === ActionType.AUTHENTICATE_USER) {
      const { lastName, firstName, email, id, accountMode, picture } = action.payload;
      draftState.isAuthenticated = true;
      draftState.id = id;
      draftState.email = email;
      draftState.accountMode = accountMode;
      draftState.profile = { firstName, lastName, picture };
    }

    if (action.type === ActionType.SET_SIGN_UP_CREDENTIALS) {
      const { id, email } = action.payload;
      draftState.id = id;
      draftState.email = email;
    }

    if (action.type === ActionType.CHANGE_ACCOUNT_MODE) {
      draftState.accountMode = action.payload;
    }

    if (action.type === ActionType.LOG_OUT) {
      draftState.isAuthenticated = false;
    }
  });
};
