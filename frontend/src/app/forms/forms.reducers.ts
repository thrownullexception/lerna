import { produce } from 'immer';
import { IFormState, FormsAction, ActionType } from './forms.types';

const initial: IFormState = {
  isMakingFormRequest: false,
};

export const formsReducer = (state = initial, action: FormsAction) => {
  return produce(state, draftState => {
    if (action.type === ActionType.FORMS_REQUEST_ENDED) {
      draftState.isMakingFormRequest = false;
    }

    if (action.type === ActionType.FORM_REQUEST_STARTED) {
      draftState.isMakingFormRequest = true;
    }
  });
};
