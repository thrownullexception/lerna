import * as React from 'react';
import { IProps } from './ListStudentSkills.types';
import { Spinner } from '../../../../components/Spinner';

export class ListStudentSkills extends React.PureComponent<IProps> {
  componentDidMount() {
    this.props.getSkills();
  }
  render() {
    const { skills, isFetching, skill, getSkill, goBackInSkillsDepth, skillsDepth } = this.props;

    return (
      <div className="row row-sm">
        <div className="col-lg-12 col-xl-3">
          <div className="card card--events mg-b-20">
            <div className="card-body">
              <div className="pd-20">
                <div className="main-content-label mb-0">
                  {skillsDepth.length > 0 ? (
                    <button
                      className="link-like inline-block"
                      onClick={() => {
                        goBackInSkillsDepth();
                      }}
                    >
                      <i
                        className="fe fe-arrow-left text-primary mr-2"
                        data-toggle="tooltip"
                        title=""
                        data-placement="top"
                      />
                    </button>
                  ) : null}
                  {skill.name || 'Software Eng Paths'}
                </div>
              </div>
              <div className="list-group to-do-tasks ">
                <Spinner isFetching={isFetching}>
                  {skills.map(({ id, name, hasChildren }) => (
                    <button
                      className="list-group-item link-like"
                      onClick={() => {
                        getSkill(id);
                      }}
                      key={id}
                    >
                      <div className="event-indicator bg-info" />
                      <h6 className="mg-t-5">
                        {name}
                        {hasChildren ? (
                          <span className="ml-auto">
                            <i
                              className="fe fe-arrow-right text-primary mr-2"
                              data-toggle="tooltip"
                              title=""
                              data-placement="top"
                            />
                          </span>
                        ) : null}
                      </h6>
                    </button>
                  ))}
                </Spinner>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-9 col-md-12">
          <div className="card card--events mg-b-20">
            <div className="card-body">
              <Spinner isFetching={isFetching}>{skill.description} dsdsd a</Spinner>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
