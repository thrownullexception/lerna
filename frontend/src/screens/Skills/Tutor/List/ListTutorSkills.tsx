import * as React from 'react';
import { IProps } from './ListTutorSkills.types';

export class ListTutorSkills extends React.Component<IProps> {
  componentDidMount() {
    this.props.getTutorSkills();
  }

  render() {
    return (
      <div className="row row-sm">
        <div className="col-lg-12 col-xl-3">Tutor Skills</div>
      </div>
    );
  }
}
