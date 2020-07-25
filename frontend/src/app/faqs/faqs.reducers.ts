import { produce } from 'immer';
import { IFaqState, FaqsActionType, ActionType } from './faqs.types';

const initial: IFaqState = {
  faqs: [],
};

export const faqsReducer = (state = initial, action: FaqsActionType) => {
  return produce(state, draftState => {
    if (action.type === ActionType.SET_FAQS) {
      draftState.faqs = action.payload;
    }
  });
};
