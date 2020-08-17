import * as React from 'react';
import { IProps } from './TutorSessionDetails.types';

export class TutorSessionDetails extends React.PureComponent<IProps> {
  render() {
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-body">
              <div className="row">Tutor Session Details</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
