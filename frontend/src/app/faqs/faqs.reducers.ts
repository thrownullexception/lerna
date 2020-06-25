import { produce } from 'immer';
import { IFaqState, FaqsAction, ActionType } from './faqs.types';
import { FaqResponse } from './responses';

const initial: IFaqState = {
  faqs: [],
  faq: new FaqResponse({}),
  isFetching: false,
};

export const faqsReducer = (state = initial, action: FaqsAction) => {
  return produce(state, draftState => {
    if (action.type === ActionType.FETCH_FAQS_SUCCESSFULL) {
      draftState.faqs = action.payload;
    }

    if (action.type === ActionType.FAQS_REQUEST_ENDED) {
      draftState.isFetching = false;
    }

    if (action.type === ActionType.FAQS_REQUEST_STARTED) {
      draftState.isFetching = true;
    }

    // if (action.type === ActionType.ADD_FAQ) {
    //   const { faq, id } = action.payload;
    //   draftState.faqs.push({ ...faq, id, admin: 'Me' });
    // }

    if (action.type === ActionType.FETCH_FAQ_SUCCESSFULL) {
      draftState.faq = action.payload;
    }

    // if (action.type === ActionType.UPDATE_FAQ) {
    //   const { faq, id } = action.payload;
    //   const index = draftState.faqs.findIndex(currentFaq => currentFaq.id === id);
    //   draftState.faqs[index] = { ...draftState.faqs[index], ...faq };
    // }

    // if (action.type === ActionType.DELETE_FAQ) {
    //   const index = draftState.faqs.findIndex(faq => faq.id === action.payload);
    //   draftState.faqs.splice(index, 1);
    // }
  });
};
