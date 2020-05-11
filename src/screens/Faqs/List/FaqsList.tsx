import * as React from 'react';
import { IProps } from './FaqsList.types';
import { Spinner } from '../../../components/Spinner';

export class FaqsList extends React.PureComponent<IProps> {
  componentDidMount() {
    this.props.getFaqs();
  }
  render() {
    const { faqs, isFetching } = this.props;
    return (
      <Spinner isFetching={isFetching}>
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              {faqs.map(({ question, answer, id }) => (
                <div className="card-body" key={id}>
                  <h4 className="font-weight-semibold tx-15">{question}</h4>
                  <p className="text-muted mb-0 tx-13">{answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Spinner>
    );
  }
}
