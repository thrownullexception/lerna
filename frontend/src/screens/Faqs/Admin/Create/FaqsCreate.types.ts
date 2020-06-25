import { IFaqsForm } from '../../../../app/faqs/faqs.types';

export interface IProps {
  postFaqs: (faqsForm: IFaqsForm) => void;
  isFetching: boolean;
}

export type StateProps = Pick<IProps, 'isFetching'>;

export type DispatchProps = Pick<IProps, 'postFaqs'>;
