import * as React from 'react';
import { IProps } from './FaqsList.types';
import { NavigationService } from '../../../services';
import { FaqsPath } from '..';
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
              {[1, 2, 3, 4, 5, 6].map(fixMe => (
                <div className="card-body" key={fixMe}> 
                  <h4 className="font-weight-semibold tx-15">How To Insert All The Plugins?</h4>
                  <p className="text-muted mb-0 tx-13">
                    I must explain to you how all this mistaken idea of denouncing pleasure and
                    praising pain was born and I will give you a complete account of the system, and
                    expound the actual teachings of the great explorer of the truth, the
                    master-builder of human happiness. No one rejects, dislikes, or avoids pleasure
                    itself, because it is pleasure, but because those who do not know how to pursue
                    pleasure rationally encounter consequences
                  </p>
                </div>
                // <a
                //   key={faq.id}
                //   href={NavigationService.hash(NavigationService.editPath(FaqsPath, `${faq.id}`))}
                //   className="list-group-item list-group-item-action flex-column align-items-start"
                // >
                //   <div className="d-flex w-100 justify-content-between">
                //     <h3 className="mb-1">{faq.question}</h3>
                //   </div>
                //   <p className="mb-1">{faq.answer}</p>
                // </a>
              ))}
            </div>
          </div>
        </div>
      </Spinner>
    );
  }
}
