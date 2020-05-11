import { createSelector } from 'reselect';
import { IStore } from '../../store/rootReducers';
import { AccountModeLabel, AccountModePaths } from './auth.types';

const base = (state: IStore) => state.auth;


export const selectAccountMode = createSelector(base, ({ accountMode }) => accountMode);
export const selectAuthIsMakingRequest = createSelector(
  base,
  ({ isMakingRequest }) => isMakingRequest,
);

export const selectUserFullName = createSelector(
  base,
  ({ profile: { lastName, firstName } }) => `${firstName} ${lastName}`,
);

export const selectUserPicture = createSelector(base, ({ profile: { picture } }) => picture);

export class AuthSelectors {
  static base(state: IStore) {
    return state.skills;
  }

  static selectAccountModePath(state: IStore) {
    return createSelector(base, ({ accountMode }) => AccountModePaths[accountMode])(state);
  }

  static selectAccountModeLabel(state: IStore) {
    return createSelector(base, ({ accountMode }) => AccountModeLabel[accountMode])(state);
  }
}
