import { Dispatch } from 'redux';
import { action } from 'typesafe-actions';
import { ThunkInterface } from '../../shared/types';
import { FaqsActionType, ActionType } from './faqs.types';
import { RequestService, ToastService } from '../../services';
import { FaqResponse } from './responses';
import { IStore } from '../../store/rootReducers';
import { AuthSelectors } from '../auth/auth.selectors';
import { RequestStatusActionType } from '../request-status/request-status.types';

const BASE_PATH = 'faqs';

export class FaqsActions {
  static getFaqs(): ThunkInterface<void> {
    return async (dispatch: Dispatch<FaqsActionType>, getState: () => IStore) => {
      dispatch(action(RequestStatusActionType.DATA_REQUEST_STARTED));
      try {
        const { data } = await RequestService.get(
          `${BASE_PATH}?account_mode=${AuthSelectors.selectAccountModePath(getState())}`,
        );
        dispatch(
          action(
            ActionType.SET_FAQS,
            data.map((datum: object) => new FaqResponse(datum)),
          ),
        );
      } catch (e) {
        ToastService.error(e);
      }
      dispatch(action(RequestStatusActionType.DATA_REQUEST_ENDED));
    };
  }
}
