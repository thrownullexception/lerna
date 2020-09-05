import { FaqResponse } from '../../../app/faqs/responses';

export interface IProps {
  getFaqs: () => void;
  faqs: FaqResponse[];
  selectIsMakingDataRequest: boolean;
}

export type StateProps = Pick<IProps, 'faqs' | 'selectIsMakingDataRequest'>;
export type DispatchProps = Pick<IProps, 'getFaqs'>;
