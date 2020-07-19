import { Dispatch } from 'redux';
import { action } from 'typesafe-actions';
import { ThunkInterface } from '../../shared/types';
import { FaqsActionType, ActionType } from './faqs.types';
import { RequestService, ToastService } from '../../services';
import { FaqResponse } from './responses';
import { IStore } from '../../store/rootReducers';
import { AuthSelectors } from '../auth/auth.selectors';

const BASE_PATH = 'faqs';

export class FaqsActions {
  static getFaqs(): ThunkInterface<void> {
    return async (dispatch: Dispatch<FaqsActionType>, getState: () => IStore) => {
      dispatch(action(ActionType.FAQS_REQUEST_STARTED));
      try {
        const { data } = await RequestService.get(
          `${BASE_PATH}?account_mode=${AuthSelectors.selectAccountModePath(getState())}`,
        );
        dispatch(
          action(
            ActionType.FETCH_FAQS_SUCCESSFULL,
            data.map((datum: object) => new FaqResponse(datum)),
          ),
        );
      } catch (e) {
        ToastService.error(e);
      }
      dispatch(action(ActionType.FAQS_REQUEST_ENDED));
    };
  }
}

// export const getFaq = (faqId: number): ThunkInterface<void> => {
//   return async (dispatch: Dispatch<FaqsActionType>) => {
//     dispatch(action(ActionType.FAQS_REQUEST_STARTED));
//     try {
//       const response = await RequestService.get(`${BASE_PUBLIC_REQUEST_PATH}/${faqId}`);
//       dispatch(action(ActionType.FETCH_FAQ_SUCCESSFULL, new Faq(response.data)));
//     } catch (e) {
//       ToastService.error(e);
//     }
//     dispatch(action(ActionType.FAQS_REQUEST_ENDED));
//   };
// };

// export const postFaqs = (faqsForm: IFaqsForm): ThunkInterface<void> => {
//   return async (dispatch: Dispatch<FaqsActionType>) => {
//     dispatch(action(ActionType.FAQS_REQUEST_STARTED));
//     try {
//       const { id } = await RequestService.post(BASE_REQUEST_PATH, faqsForm);
//       dispatch(
//         action(ActionType.ADD_FAQ, {
//           id,
//           faq: faqsForm,
//         }),
//       );
//       NavigationService.goTo(FaqsPath);
//       ToastService.success('Faq Created Successfully');
//     } catch (e) {
//       ToastService.error(e);
//     }
//     dispatch(action(ActionType.FAQS_REQUEST_ENDED));
//   };
// };

// export const patchFaqs = (faqId: number, faqsForm: IFaqsForm): ThunkInterface<void> => {
//   return async (dispatch: Dispatch<FaqsActionType>) => {
//     dispatch(action(ActionType.FAQS_REQUEST_STARTED));
//     try {
//       const { id } = await RequestService.patch(`${BASE_REQUEST_PATH}/${faqId}`, faqsForm);
//       dispatch(
//         action(ActionType.UPDATE_FAQ, {
//           id,
//           faq: faqsForm,
//         }),
//       );
//       NavigationService.goTo(FaqsPath);
//       ToastService.success('Faq Updated Successfully');
//     } catch (e) {
//       ToastService.error(e);
//     }
//     dispatch(action(ActionType.FAQS_REQUEST_ENDED));
//   };
// };

// export const deleteFaq = (faqId: number): ThunkInterface<void> => {
//   return async (dispatch: Dispatch<FaqsActionType>) => {
//     dispatch(action(ActionType.FAQS_REQUEST_STARTED));
//     try {
//       await RequestService.delete(`${BASE_REQUEST_PATH}/${faqId}`);
//       dispatch(action(ActionType.DELETE_FAQ, faqId));
//       NavigationService.goTo(FaqsPath);
//       ToastService.success('Faq Deleted Successfully');
//     } catch (e) {
//       ToastService.error(e);
//     }
//     dispatch(action(ActionType.FAQS_REQUEST_ENDED));
//   };
// };
