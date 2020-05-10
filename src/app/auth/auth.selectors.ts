import { createSelector } from 'reselect';
import { IStore } from '../../store/rootReducers';

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