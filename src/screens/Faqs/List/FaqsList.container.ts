import { connect } from 'react-redux';
import { IThunkDispatch } from '../../../shared/types';
import { IStore } from '../../../store/rootReducers';
import { FaqsList } from './FaqsList';
import { DispatchProps, StateProps } from './FaqsList.types';
import { getFaqs } from '../../../app/faqs/faqs.actions';

const mapStateToProps = (state: IStore): StateProps => {
  return {
    faqs: state.faqs.faqs,
    isFetching: state.faqs.isFetching,
  };
};

const mapDispatchToProps = (dispatch: IThunkDispatch): DispatchProps => {
  return {
    getFaqs: () => {
      dispatch(getFaqs());
    },
  };
};
const connected = connect(mapStateToProps, mapDispatchToProps)(FaqsList) as React.ComponentType;

export { connected as FaqsListContainer };
