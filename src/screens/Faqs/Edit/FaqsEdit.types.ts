import { IFaqsForm, Faq } from '../../../app/faqs/faqs.types';

export interface IProps {
  editFaq: (faqId: number, faqsForm: IFaqsForm) => void;
  getFaq: (faqId: number) => void;
  deleteFaq: (faqId: number) => void;
  isFetching: boolean;
  faq: Faq;
}

export type StateProps = Pick<IProps, 'isFetching' | 'faq'>;

export type DispatchProps = Pick<IProps, 'editFaq' | 'getFaq' | 'deleteFaq'>;
