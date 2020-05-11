import { IFaqsForm } from '../../../../app/faqs/faqs.types';
import { FaqResponse } from '../../../../app/faqs/responses';

export interface IProps {
  editFaq: (faqId: number, faqsForm: IFaqsForm) => void;
  getFaq: (faqId: number) => void;
  deleteFaq: (faqId: number) => void;
  isFetching: boolean;
  faq: FaqResponse;
}

export type StateProps = Pick<IProps, 'isFetching' | 'faq'>;

export type DispatchProps = Pick<IProps, 'editFaq' | 'getFaq' | 'deleteFaq'>;
