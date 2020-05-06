import { get } from 'lodash-es';

export interface IFaqState {
  faqs: Faq[];
  faq: Faq;
  isFetching: boolean;
}

export enum ActionType {
  FAQS_REQUEST_STARTED = 'FAQS_REQUEST_STARTED',
  FETCH_FAQS_SUCCESSFULL = 'FETCH_FAQS_SUCCESSFULL',
  FAQS_REQUEST_ENDED = 'FAQS_REQUEST_ENDED',
  FETCH_FAQ_SUCCESSFULL = 'FETCH_FAQ_SUCCESSFULL',
  ADD_FAQ = 'ADD_FAQ',
  DELETE_FAQ = 'DELETE_FAQ',
  UPDATE_FAQ = 'UPDATE_FAQ',
}

interface IFetchFaqsSuccessfull {
  type: ActionType.FETCH_FAQS_SUCCESSFULL;
  payload: Faq[];
}

interface IFetchFaqSuccessfull {
  type: ActionType.FETCH_FAQ_SUCCESSFULL;
  payload: Faq;
}

interface IAddFaq {
  type: ActionType.ADD_FAQ;
  payload: {
    faq: IFaqsForm;
    id: number;
  };
}

interface IUpdateFaq {
  type: ActionType.UPDATE_FAQ;
  payload: {
    faq: IFaqsForm;
    id: number;
  };
}

interface IRemoveFaq {
  type: ActionType.DELETE_FAQ;
  payload: number;
}

interface IFaqsRequestStarted {
  type: ActionType.FAQS_REQUEST_STARTED;
}

interface IFaqsRequestEnded {
  type: ActionType.FAQS_REQUEST_ENDED;
}

interface IDefaultAction {
  type: '';
}

export type FaqsAction =
  | IFetchFaqsSuccessfull
  | IFaqsRequestStarted
  | IFaqsRequestEnded
  | IAddFaq
  | IFetchFaqSuccessfull
  | IRemoveFaq
  | IUpdateFaq
  | IDefaultAction;

export class Faq {
  id: number;
  question: string;
  answer: string;
  admin: string;

  constructor(jsonData: object) {
    this.id = get(jsonData, 'id');
    this.question = get(jsonData, 'question');
    this.answer = get(jsonData, 'answer');
    this.admin = get(jsonData, 'admin');
  }
}

export interface IFaqsForm {
  question: string;
  answer: string;
}
