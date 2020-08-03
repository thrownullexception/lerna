import * as React from 'react';
import { IProps } from './FaqsList.types';
import { Spinner } from '../../../components/Spinner';
import './styles.scss';

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
                  <h4 className="faqs-list__question">{question}</h4>
                  <p className="faqs-list__answer">{answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Spinner>
    );
  }
}
