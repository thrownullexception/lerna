import { connect } from 'react-redux';
import { IThunkDispatch } from '../../../../shared/types';
import { IStore } from '../../../../store/rootReducers';
import { FaqsEdit } from './FaqsEdit';
import { DispatchProps, StateProps } from './FaqsEdit.types';
import { IFaqsForm } from '../../../../app/faqs/faqs.types';
// import { patchFaqs, getFaq, deleteFaq } from '../../../../app/faqs/faqs.actions';

const mapStateToProps = (state: IStore): StateProps => {
  return {
    isFetching: state.faqs.isFetching,
    faq: state.faqs.faq,
  };
};

const mapDispatchToProps = (dispatch: IThunkDispatch): DispatchProps => {
  return {
    getFaq: (faqId: number) => {
      // dispatch(getFaq(faqId));
    },
    deleteFaq: (faqId: number) => {
      // dispatch(deleteFaq(faqId));
    },
    editFaq: (faqId: number, faqsForm: IFaqsForm) => {
      // dispatch(patchFaqs(faqId, faqsForm));
    },
  };
};

const connected = connect(mapStateToProps, mapDispatchToProps)(FaqsEdit);

export { connected as FaqsEditContainer };
