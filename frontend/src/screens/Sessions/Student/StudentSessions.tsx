import * as React from 'react';
import { IProps } from './StudentSessions.types';
import { SessionsPath } from '..';
import { NavigationService } from '../../../services';
import { CursorPagination } from '../../../components/CursorPagination';

export class StudentSessions extends React.PureComponent<IProps> {
  componentDidMount() {
    this.props.fetchStudentSessions({});
  }

  renderStudentSessions = () => {
    const { studentSessionsData } = this.props;
    return studentSessionsData.map(({ id, title, statusName, createdAt, skills }) => (
      <div key={id}>
        <a
          href={NavigationService.hashPath(
            NavigationService.studentPath(NavigationService.showPath(SessionsPath, id)),
          )}
        >
          {title} - {statusName} - {createdAt} - (
          {skills.map(skill => (
            <span key={skill}> {skill} </span>
          ))}
          )
        </a>
      </div>
    ));
  };

  render() {
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-body">
              <div className="row">Student Sessions</div>
              {this.renderStudentSessions()}
              <CursorPagination
                cursor={this.props.studentSessionsCursor}
                fetchData={this.props.fetchStudentSessions}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
