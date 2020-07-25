import { FaqResponse } from './responses';
import { RequestStatusAction } from '../request-status/request-status.types';

export interface IFaqState {
  faqs: FaqResponse[];
}

export enum ActionType {
  SET_FAQS = 'SET_FAQS',
}

interface ISetFaqs {
  type: ActionType.SET_FAQS;
  payload: FaqResponse[];
}

export type FaqsActionType = ISetFaqs | RequestStatusAction;
