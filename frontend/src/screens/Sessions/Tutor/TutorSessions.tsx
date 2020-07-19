import * as React from 'react';
import { IProps } from './TutorSessions.types';

export class TutorSessions extends React.PureComponent<IProps> {
  render() {
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-body">
              <div className="row">Tutor Sessions</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
