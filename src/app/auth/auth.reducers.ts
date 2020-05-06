import { produce } from 'immer';
import { IAuthState, AuthAction, ActionType } from './auth.types';
import { get } from 'lodash-es';

const initial = {
  authenticated: false,
  isMakingRequest: false,
  username: '',
  id: 0,
  permissions: [],
  role: '',
};

export const authReducer = (state: IAuthState = initial, action: AuthAction) => {
  return produce(state, draftState => {
    if (action.type === ActionType.AUTHENTICATE_USER) {
      const { role, account } = action.payload;
      draftState.authenticated = true;
      const { id, username } = account;
      draftState.id = id;
      draftState.username = username;
      draftState.role = get(role, 'name');
      draftState.permissions = get(role, 'permissions').map((permission: object) =>
        get(permission, ['permission', 'permission']),
      );
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
