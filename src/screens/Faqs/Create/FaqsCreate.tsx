import * as React from 'react';
import { IProps } from './FaqsCreate.types';
import { FaqsForm } from '../forms/Faqs.form';
import { IFaqsForm } from '../../../app/faqs/faqs.types';

export class FaqsCreate extends React.PureComponent<IProps> {
  postFaqs = (faqsForm: IFaqsForm) => {
    this.props.postFaqs(faqsForm);
  };

  render() {
    return <FaqsForm onSubmit={this.postFaqs} isMakingRequest={this.props.isFetching} />;
  }
}
