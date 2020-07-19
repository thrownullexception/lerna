import * as React from 'react';
import { IProps, ICreateSessionForm } from './CreateSession.types';
import { CreateSessionForm } from './CreateSession.form';

export class CreateSession extends React.PureComponent<IProps> {
  render() {
    const { isMakingRequest } = this.props;
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col-md-10 col-lg-8 col-xl-6 mx-auto d-block">
                  <div className="card card-body pd-20 pd-md-40 border shadow-none">
                    <h5 className="card-title mg-b-20">Your Requirements</h5>
                    <CreateSessionForm
                      onSubmit={this.createSession}
                      isMakingRequest={isMakingRequest}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  private createSession = (createSessionForm: ICreateSessionForm) => {
    this.props.createSession(createSessionForm);
  };
}
