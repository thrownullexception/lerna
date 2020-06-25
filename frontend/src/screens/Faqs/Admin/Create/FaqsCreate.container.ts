import { connect } from 'react-redux';
import { IThunkDispatch } from '../../../../shared/types';
import { IStore } from '../../../../store/rootReducers';
import { FaqsCreate } from './FaqsCreate';
import { DispatchProps, StateProps } from './FaqsCreate.types';
import { IFaqsForm } from '../../../../app/faqs/faqs.types';
// import { postFaqs } from '../../../../app/faqs/faqs.actions';

const mapStateToProps = (state: IStore): StateProps => {
  return {
    isFetching: state.faqs.isFetching,
  };
};

const mapDispatchToProps = (dispatch: IThunkDispatch): DispatchProps => {
  return {
    postFaqs: (faqsForm: IFaqsForm) => {
      // dispatch(postFaqs(faqsForm));
    },
  };
};
const connected = connect(mapStateToProps, mapDispatchToProps)(FaqsCreate);

export { connected as FaqsCreateContainer };
