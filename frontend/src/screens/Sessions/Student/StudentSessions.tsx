import * as React from 'react';
import { IProps } from './StudentSessions.types';

export class StudentSessions extends React.PureComponent<IProps> {
  render() {
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-body">
              <div className="row">Student Sessions</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
