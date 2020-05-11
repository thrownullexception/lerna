import { connect } from 'react-redux';
import { IThunkDispatch } from '../../../shared/types';
import { IStore } from '../../../store/rootReducers';
import { FaqsList } from './FaqsList';
import { DispatchProps, StateProps } from './FaqsList.types';
import { FaqsActions } from '../../../app/faqs/faqs.actions';

const mapStateToProps = (state: IStore): StateProps => {
  return {
    faqs: state.faqs.faqs,
    isFetching: state.faqs.isFetching,
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
