import * as React from 'react';
import { IProps } from './StudentSessionDetails.types';

export class StudentSessionDetails extends React.PureComponent<IProps> {
  render() {
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-body">
              <div className="row">Student Session Details</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
