import { produce } from 'immer';
import {
  IRequestStatusState,
  RequestStatusAction,
  RequestStatusActionType,
} from './request-status.types';

const initial: IRequestStatusState = {
  isMakingFormRequest: false,
  isMakingDataRequest: false,
};

export const requestStatusReducer = (state = initial, action: RequestStatusAction) => {
  return produce(state, draftState => {
    if (action.type === RequestStatusActionType.FORM_REQUEST_ENDED) {
      draftState.isMakingFormRequest = false;
    }

    if (action.type === RequestStatusActionType.FORM_REQUEST_STARTED) {
      draftState.isMakingFormRequest = true;
    }

    if (action.type === RequestStatusActionType.DATA_REQUEST_ENDED) {
      draftState.isMakingDataRequest = false;
    }

    if (action.type === RequestStatusActionType.DATA_REQUEST_STARTED) {
      draftState.isMakingDataRequest = true;
    }
  });
};
