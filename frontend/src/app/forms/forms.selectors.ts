import { createSelector } from 'reselect';
import { IStore } from '../../store/rootReducers';

export class FormSelectors {
  static base(state: IStore) {
    return state.form;
  }

  static selectIsMakingFormRequest(state: IStore) {
    return createSelector(
      FormSelectors.base,
      ({ isMakingFormRequest }) => isMakingFormRequest,
    )(state);
  }
}
