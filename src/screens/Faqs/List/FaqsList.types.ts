import { FaqResponse } from '../../../app/faqs/responses';

export interface IProps {
  getFaqs: () => void;
  faqs: FaqResponse[];
  isFetching: boolean;
}

export type StateProps = Pick<IProps, 'faqs' | 'isFetching'>;
export type DispatchProps = Pick<IProps, 'getFaqs'>;
