import { Dispatch } from 'redux';
import { ThunkInterface } from '../../shared/types';
import { RequestService, ToastService } from '../../services';
import { FaqResponse } from './responses';
import { faqsSlice } from './faqs.ducks';
import { IStore } from '../../store/rootReducers';
import { AuthSelectors } from '../auth/auth.selectors';
import { requestStatusSlice } from '../request-status/request-status.ducks';

const BASE_PATH = 'faqs';

export class FaqsActions {
  static getFaqs(): ThunkInterface<void> {
    return async (dispatch: Dispatch, getState: () => IStore) => {
      dispatch(requestStatusSlice.actions.dataRequestStarted());
      try {
        const { data } = await RequestService.get(
          `${BASE_PATH}?account_mode=${AuthSelectors.selectAccountModePath(getState())}`,
        );
        dispatch(faqsSlice.actions.setFaqs(data.map((datum: object) => new FaqResponse(datum))));
      } catch (e) {
        ToastService.error(e);
      }
      dispatch(requestStatusSlice.actions.dataRequestEnded());
    };
  }
}
