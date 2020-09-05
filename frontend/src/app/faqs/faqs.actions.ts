import { ThunkInterface, IThunkDispatch } from '../../shared/types';
import { RequestService, ToastService } from '../../services';
import { FaqResponse } from './responses';
import { faqsSlice } from './faqs.ducks';
import { FaqsSelectors } from './faqs.selectors';
import { IStore } from '../../store/rootReducers';
import { AuthSelectors } from '../auth/auth.selectors';
import { RequestStatusActions } from '../request-status/request-status.actions';

const BASE_PATH = 'faqs';

export class FaqsActions {
  static getFaqs(): ThunkInterface<void> {
    return async (dispatch: IThunkDispatch, getState: () => IStore) => {
      dispatch(RequestStatusActions.startRequestIndicator(FaqsSelectors.selectFaqs(getState())));
      try {
        const { data } = await RequestService.get(
          `${BASE_PATH}?account_mode=${AuthSelectors.selectAccountModePath(getState())}`,
        );
        dispatch(faqsSlice.actions.setFaqs(data.map((datum: object) => new FaqResponse(datum))));
      } catch (e) {
        ToastService.error(e);
      }
      dispatch(RequestStatusActions.endRequestIndicator());
    };
  }
}
