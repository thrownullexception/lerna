import * as React from 'react';
import { IProps } from './FaqsList.types';
import './styles.scss';
import { RenderListData } from '../../../components';

export class FaqsList extends React.PureComponent<IProps> {
  componentDidMount() {
    this.props.getFaqs();
  }
  render() {
    const { faqs, selectIsMakingDataRequest } = this.props;
    return (
      <RenderListData
        cursor={{}}
        isMakingDataRequest={selectIsMakingDataRequest}
        emptyText="No Faqs"
      >
        {faqs.map(({ question, answer, id }) => (
          <div className="card-body" key={id}>
            <h4 className="faqs-list__question">{question}</h4>
            <p className="faqs-list__answer">{answer}</p>
          </div>
        ))}
      </RenderListData>
    );
  }
}
