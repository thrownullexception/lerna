import * as React from 'react';
import { pick } from 'lodash-es';
import { IProps } from './FaqsEdit.types';
import { FaqsForm } from '../forms/Faqs.form';
import { IFaqsForm } from '../../../app/faqs/faqs.types';
import { RouteComponentProps } from 'react-router-dom';
import { ToastService } from '../../../services';

export class FaqsEdit extends React.PureComponent<IProps & RouteComponentProps<{ id: string }>> {
  private faqId!: number;

  componentDidMount() {
    const { getFaq, match } = this.props;
    this.faqId = +match.params.id;
    getFaq(this.faqId);
  }

  editFaq = (faqsForm: IFaqsForm) => {
    this.props.editFaq(this.faqId, faqsForm);
  };

  deleteFaq = () => {
    ToastService.confirmDelete(() => {
      this.props.deleteFaq(this.faqId);
    });
  };

  render() {
    const { isFetching, faq } = this.props;
    return (
      <>
        <p>
          Last Updated By {faq.admin}
          <button className="btn btn-xs btn-danger pull-right" onClick={this.deleteFaq}>
            Delete
          </button>
        </p>
        <FaqsForm
          onSubmit={this.editFaq}
          isMakingRequest={isFetching}
          initialValues={pick(faq, ['question', 'answer'])}
        />
      </>
    );
  }
}
