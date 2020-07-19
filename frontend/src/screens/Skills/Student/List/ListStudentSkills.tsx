import * as React from 'react';
import { IProps } from './ListStudentSkills.types';
import { Spinner } from '../../../../components/Spinner';
import { SkillResourceResponse } from '../../../../app/skills/responses/skill-resource.response';
import { SkillResponse } from '../../../../app/skills/responses';

export class ListStudentSkills extends React.Component<IProps> {
  componentDidMount() {
    this.props.getSkillsWithHeirarchies();
  }

  renderSkillResource = ({ id, title, link, mediaType }: SkillResourceResponse) => (
    <a className="list-group-item" href={link} target="_blank" key={id}>
      <i className="fe fe-airplay mr-2" aria-hidden="true" />
      {title}
    </a>
  );

  renderRelatedSkill = ({ id, name }: SkillResponse) => (
    <a href="/" className="tag tag-rounded tag-indigo" key={id}>
      {name}
    </a>
  );

  render() {
    const {
      skills,
      skill,
      skillInHierarchy,
      getStudentSkill,
      goBackInSkillsDepth,
      skillsDepth,
      setCurrentSkillId,
    } = this.props;
    const isFetching = false;
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
                  {skillInHierarchy.name || 'Software Eng Paths'}
                </div>
              </div>
              <div className="list-group to-do-tasks ">
                <Spinner isFetching={isFetching}>
                  {skills.map(({ id, name, hasChildren }) => (
                    <button
                      className="list-group-item link-like"
                      onClick={() => {
                        getStudentSkill(id);
                        if (hasChildren) {
                          setCurrentSkillId(id);
                        }
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
          <div className="card mg-b-20">
            <div className="card-body">
              <Spinner isFetching={isFetching}>
                <div className="media d-block d-sm-flex">
                  <img
                    alt=""
                    className="main-img-user avatar-lg mg-sm-r-20 mg-b-20 mg-sm-b-0"
                    src="https://avatars0.githubusercontent.com/u/8915890?s=460&u=0d64410a743190d194ebd2cf1ba42d8584fdf3ce&v=4"
                  />
                  <div className="media-body">
                    <h5 className="card-title"> {skill.name} </h5>
                    {skill.description}
                  </div>
                  <nav className="nav">
                    <a
                      className="nav-link"
                      data-toggle="tooltip"
                      href=""
                      title=""
                      data-original-title="Call"
                    >
                      <i className="fa fa-heart-o fa-2x" />
                    </a>{' '}
                  </nav>
                </div>

                <div className="panel panel-primary tabs-style-3">
                  <div className="tab-menu-heading">
                    <div className="tabs-menu ">
                      <nav className="nav nav-pills flex-column flex-md-row">
                        <a href="#tab11" className="nav-link active" data-toggle="tab">
                          <i className="fa fa-laptop" /> Details
                        </a>
                        <a href="#tab12" className="nav-link" data-toggle="tab">
                          <i className="fa fa-cube" /> Community
                        </a>
                        <a href="#tab13" className="nav-link" data-toggle="tab">
                          <i className="fa fa-tasks" /> Road Map{' '}
                          <span className="badge badge-light">21/45</span>
                        </a>
                        <a href="#tab13" className="nav-link" data-toggle="tab">
                          <i className="fa fa-users" /> Tutors{' '}
                          <span className="badge badge-light">45</span>
                        </a>
                      </nav>
                    </div>
                  </div>
                  <div className="panel-body tabs-menu-body">
                    <div className="tab-content">
                      <div className="tab-pane active" id="tab11">
                        <div className="mt-2">
                          <p>
                            Lorem Ipsum generators on the Internet as necessary aut odit aut fugit,
                            sed quia consequuntur magni dolores eos qui ratione voluptatem sequi
                            nesciunt.
                          </p>
                        </div>
                        {skill.relatedSkills.length > 0 ? (
                          <>
                            <h5> Related Skills </h5>
                            <div className="tags">
                              {skill.relatedSkills.map(skill$1 => this.renderRelatedSkill(skill$1))}
                            </div>
                          </>
                        ) : null}
                        {skill.resources.length > 0 ? (
                          <>
                            <h5 className="mt-3"> Resources </h5>
                            <ul className="list-group">
                              {skill.resources.map(resource => this.renderSkillResource(resource))}
                            </ul>
                          </>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>
              </Spinner>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
