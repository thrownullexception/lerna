import { createSelector } from 'reselect';
import { IStore } from '../../store/rootReducers';

export class RequestStatusSelectors {
  static base(state: IStore) {
    return state.requestStatus;
  }

  static selectIsMakingFormRequest(state: IStore): boolean {
    return createSelector(
      RequestStatusSelectors.base,
      ({ isMakingFormRequest }) => isMakingFormRequest,
    )(state);
  }

  static selectIsMakingDataRequest(state: IStore): boolean {
    return createSelector(
      RequestStatusSelectors.base,
      ({ isMakingDataRequest }) => isMakingDataRequest,
    )(state);
  }
}
