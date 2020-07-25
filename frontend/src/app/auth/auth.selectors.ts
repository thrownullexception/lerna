import { createSelector } from 'reselect';
import { IStore } from '../../store/rootReducers';
import { AccountModeLabel, AccountModePaths, AccountModeType } from './auth.types';

const base = (state: IStore) => state.auth;

export class AuthSelectors {
  static base(state: IStore) {
    return state.auth;
  }

  static selectAccountMode(state: IStore): AccountModeType {
    return createSelector(base, ({ accountMode }) => accountMode)(state);
  }

  static selectIsAuthenticated(state: IStore): boolean {
    return createSelector(base, ({ isAuthenticated }) => isAuthenticated)(state);
  }

  static selectUserPicture(state: IStore): string {
    return createSelector(base, ({ profile: { picture } }) => picture)(state);
  }

  static selectUserFullName(state: IStore): string {
    return createSelector(
      base,
      ({ profile: { lastName, firstName } }) => `${firstName} ${lastName}`,
    )(state);
  }

  static selectAccountModePath(state: IStore): string {
    return createSelector(
      AuthSelectors.selectAccountMode,
      accountMode => AccountModePaths[accountMode],
    )(state);
  }

  static selectAccountModeLabel(state: IStore): string {
    return createSelector(
      AuthSelectors.selectAccountMode,
      accountMode => AccountModeLabel[accountMode],
    )(state);
  }
}
