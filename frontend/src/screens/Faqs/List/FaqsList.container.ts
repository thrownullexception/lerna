import { connect } from 'react-redux';
import { IThunkDispatch } from '../../../shared/types';
import { IStore } from '../../../store/rootReducers';
import { FaqsList } from './FaqsList';
import { DispatchProps, StateProps } from './FaqsList.types';
import { FaqsActions } from '../../../app/faqs/faqs.actions';
import { RequestStatusSelectors } from '../../../app/request-status/request-status.selectors';
import { FaqsSelectors } from '../../../app/faqs/faqs.selectors';

const mapStateToProps = (state: IStore): StateProps => {
  return {
    faqs: FaqsSelectors.selectFaqs(state),
    isFetching: RequestStatusSelectors.selectIsMakingDataRequest(state),
  };
};

const mapDispatchToProps = (dispatch: IThunkDispatch): DispatchProps => {
  return {
    getFaqs: () => {
      dispatch(FaqsActions.getFaqs());
    },
  };
};
const connected = connect(mapStateToProps, mapDispatchToProps)(FaqsList) as React.ComponentType;

export { connected as FaqsListContainer };
