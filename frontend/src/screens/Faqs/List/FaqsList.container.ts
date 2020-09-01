import { connect } from 'react-redux';
import { IThunkDispatch } from '../../../shared/types';
import { IStore } from '../../../store/rootReducers';
import { FaqsList } from './FaqsList';
import { DispatchProps, StateProps } from './FaqsList.types';
import { FaqsActions } from '../../../app/faqs/faqs.actions';
import { RequestStatusSelectors } from '../../../app/request-status/request-status.selectors';
import { FaqsSelectors } from '../../../app/faqs/faqs.selectors';

export const FaqsListContainer = connect(
  (state: IStore): StateProps => ({
    faqs: FaqsSelectors.selectFaqs(state),
    isFetching: RequestStatusSelectors.selectIsMakingDataRequest(state),
  }),
  (dispatch: IThunkDispatch): DispatchProps => ({
    getFaqs: () => {
      dispatch(FaqsActions.getFaqs());
    },
  }),
)(FaqsList) as React.ComponentType;
