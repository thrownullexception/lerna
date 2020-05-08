import { produce } from 'immer';
import { IAuthState, AuthAction, ActionType, AccountModeType } from './auth.types';
import get from 'lodash/fp/get';

const initial = {
  authenticated: false,
  isMakingRequest: false,
  accountMode: AccountModeType.Student,
  email: '',
  id: 0,
  profile: {
    lastName: '',
    firstName: '',
  },
  permissions: [],
  role: '',
};

export const authReducer = (state: IAuthState = initial, action: AuthAction) => {
  return produce(state, draftState => {
    if (action.type === ActionType.AUTHENTICATE_USER) {
      const { role, account } = action.payload;
      draftState.authenticated = true;
      const { id } = account;
      draftState.id = id;
      draftState.role = get('name', role);
      draftState.permissions = get('permissions', role).map((permission: object) =>
        get(['permission', 'permission'], permission),
      );
    }

    if (action.type === ActionType.SET_SIGN_UP_CREDENTIALS) {
      const { id, email } = action.payload;
      draftState.id = id;
      draftState.email = email;
    }

    if (action.type === ActionType.LOG_OUT) {
      draftState.authenticated = false;
    }

    if (action.type === ActionType.MAKING_AUTH_REQUEST) {
      draftState.isMakingRequest = true;
    }

    if (action.type === ActionType.AUTH_REQUEST_ENDED) {
      draftState.isMakingRequest = false;
    }
  });
};
