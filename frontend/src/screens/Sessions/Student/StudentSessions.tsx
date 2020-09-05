import * as React from 'react';
import { IProps } from './StudentSessions.types';
import { SessionsPath } from '..';
import { NavigationService } from '../../../services';
import { RenderListData, RenderStatus } from '../../../components';
import { TimeFilters } from '../../../shared/filters';

export class StudentSessions extends React.PureComponent<IProps> {
  componentDidMount() {
    this.props.fetchStudentSessions({});
  }

  renderStudentSessions = () => {
    const {
      studentSessionsData,
      isMakingDataRequest,
      studentSessionsCursor,
      fetchStudentSessions,
    } = this.props;
    return (
      <RenderListData
        cursor={studentSessionsCursor}
        dataFetchingAction={fetchStudentSessions}
        isMakingDataRequest={isMakingDataRequest}
        emptyText="No Sessions Created"
      >
        {studentSessionsData.map(
          ({ id, title, statusDisplayName, statusTheme, description, createdAt, skills }) => (
            <div className="card-body d-flex flex-column" key={id}>
              <a
                href={NavigationService.hashPath(
                  NavigationService.studentPath(NavigationService.showPath(SessionsPath, id)),
                )}
                className="text-black"
              >
                <div className="row">
                  <div className="col-6">
                    <RenderStatus theme={statusTheme} text={statusDisplayName} />
                  </div>
                  <div className="col-6 text-right">
                    <small className="text-muted text-right" style={{ alignSelf: 'self-end' }}>
                      {TimeFilters.formatTime(createdAt, 'DateAndTime')}
                    </small>
                  </div>
                </div>
                <p className="card-title mt-1 mb-0"> {title}</p>
                <p className="mt-1 mb-0">{description}</p>
              </a>
              <div className="d-flex align-items-center pt-1 mt-auto">
                {skills.map(skill => (
                  <span className="tag tag-rounded mr-1" key={skill}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ),
        )}
      </RenderListData>
    );
  };

  // card-aside custom-card

  render() {
    return this.renderStudentSessions();
  }
}
