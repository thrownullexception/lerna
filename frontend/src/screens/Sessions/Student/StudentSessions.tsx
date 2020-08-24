import * as React from 'react';
import { IProps } from './StudentSessions.types';
import { SessionsPath } from '..';
import { NavigationService } from '../../../services';
import { CursorPagination } from '../../../components/CursorPagination';
import { TimeFilters } from '../../../shared/filters';

export class StudentSessions extends React.PureComponent<IProps> {
  componentDidMount() {
    this.props.fetchStudentSessions({});
  }

  renderStudentSessions = () => {
    const { studentSessionsData } = this.props;
    return studentSessionsData.map(
      ({ id, title, statusDisplayName, statusSystemName, createdAt, skills }) => (
        <div className="card card-aside custom-card" key={id}>
          <div className="card-body d-flex flex-column">
            <h4>
              <a
                href={NavigationService.hashPath(
                  NavigationService.studentPath(NavigationService.showPath(SessionsPath, id)),
                )}
                className="card-title"
              >
                {title}
              </a>
            </h4>
            <p>
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
              mollit anim id est laborum.
            </p>
            <div className="d-flex align-items-center pt-3 mt-auto">
              {skills.map(skill => (
                <span className="btn ripple btn-outline-secondary btn-sm mr-1" key={skill}>
                  {skill}
                </span>
              ))}
              <small className="d-block text-muted text-right">
                {TimeFilters.formatTime(createdAt, 'DateAndTime')}
              </small>
            </div>
          </div>
        </div>
      ),
    );
  };

  render() {
    return (
      <div className="row">
        <div className="col-md-12">
          {this.renderStudentSessions()}
          <CursorPagination
            cursor={this.props.studentSessionsCursor}
            fetchData={this.props.fetchStudentSessions}
          />
        </div>
      </div>
    );
  }
}
