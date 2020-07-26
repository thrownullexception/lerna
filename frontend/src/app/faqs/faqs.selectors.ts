import { createSelector } from 'reselect';
import { IStore } from '../../store/rootReducers';
import { FaqResponse } from './responses';

export class FaqsSelectors {
  static base(state: IStore) {
    return state.faqs;
  }

  static selectFaqs(state: IStore): FaqResponse[] {
    return createSelector(FaqsSelectors.base, ({ faqs }) => faqs)(state);
  }
}
