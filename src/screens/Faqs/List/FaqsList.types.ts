import { Faq } from '../../../app/faqs/faqs.types';

export interface IProps {
  getFaqs: () => void;
  faqs: Faq[];
  isFetching: boolean;
}

export type StateProps = Pick<IProps, 'faqs' | 'isFetching'>;
export type DispatchProps = Pick<IProps, 'getFaqs'>;
