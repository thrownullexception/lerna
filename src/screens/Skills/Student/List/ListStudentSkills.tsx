import * as React from 'react';
import { IProps } from './ListStudentSkills.types';
import { Spinner } from '../../../../components/Spinner';

export class ListStudentSkills extends React.PureComponent<IProps> {
  componentDidMount() {
    this.props.getSkills();
  }
  render() {
    const {
      skills,
      isFetching,
      skill,
      skillInHierarchy,
      getSkill,
      goBackInSkillsDepth,
      skillsDepth,
      setCurrentSkillId,
    } = this.props;

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
                        getSkill(id);
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
                </div>

                <div className="panel panel-primary tabs-style-3">
                  <div className="tab-menu-heading">
                    <div className="tabs-menu ">
                      <ul className="nav panel-tabs">
                        <li className="">
                          <a href="#tab11" className="active" data-toggle="tab">
                            <i className="fa fa-laptop" /> Details
                          </a>
                        </li>
                        <li>
                          <a href="#tab12" data-toggle="tab">
                            <i className="fa fa-cube" /> Forum
                          </a>
                        </li>
                        <li>
                          <a href="#tab13" data-toggle="tab">
                            <i className="fa fa-cogs" /> Favourites
                          </a>
                        </li>
                        <li>
                          <a href="#tab14" data-toggle="tab">
                            <i className="fa fa-tasks" /> Road Map <span className="badge badge-light">21/45</span>
                          </a>
                        </li>
                      </ul>
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
                          <p>
                            Lorem Ipsum generators on the Internet as necessary aut odit aut fugit,
                            sed quia consequuntur magni dolores eos qui ratione voluptatem sequi
                            nesciunt.
                          </p>
                          <p>
                            Lorem Ipsum generators on the Internet as necessary aut odit aut fugit,
                            sed quia consequuntur magni dolores eos qui ratione voluptatem sequi
                            nesciunt.
                          </p>
                          <p>
                            Lorem Ipsum generators on the Internet as necessary aut odit aut fugit,
                            sed quia consequuntur magni dolores eos qui ratione voluptatem sequi
                            nesciunt.
                          </p>
                        </div>
                        <h5> Related Skills </h5>
                        <div className="tags">
                          <a href="/" className="tag tag-rounded tag-indigo">
                            NodeJS
                          </a>
                          <a href="/" className="tag tag-rounded tag-indigo">
                            Express
                          </a>
                        </div>
                        <h5 className="mt-3"> Resources </h5>
                        <ul className="list-group">
                          <a className="list-group-item" href="/" target="_blank">
                            <i className="fe fe-airplay mr-2" aria-hidden="true" />
                            Et harum quidem rerum facilis est et
                          </a>
                          <a className="list-group-item" href="/" target="_blank">
                            <i className="fe fe-airplay mr-2" aria-hidden="true" />
                            Et harum quidem rerum facilis est et
                          </a>
                          <a className="list-group-item" href="/" target="_blank">
                            <i className="fe fe-airplay mr-2" aria-hidden="true" />
                            Et harum quidem rerum facilis est et
                          </a>
                          <a className="list-group-item" href="/" target="_blank">
                            <i className="fe fe-airplay mr-2" aria-hidden="true" />
                            Et harum quidem rerum facilis est et
                          </a>
                          <a className="list-group-item" href="/" target="_blank">
                            <i className="fe fe-airplay mr-2" aria-hidden="true" />
                            Et harum quidem rerum facilis est et
                          </a>
                        </ul>
                      </div>
                      <div className="tab-pane" id="tab11">
                        <p>
                          At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis
                          praesentium voluptatum deleniti atque corrupti quos dolores et quas
                          molestias excepturi sint occaecati cupiditate non provident, similique
                          sunt in culpa qui officia deserunt mollitia animi, id est laborum et
                          dolorum fuga.
                        </p>
                        <p className="mb-0">
                          Et harum quidem rerum facilis est et expedita distinctio. Nam libero
                          tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo
                          minus id quod maxime placeat facere possimus, omnis voluptas assumenda
                          est, omnis dolor repellendus.{' '}
                        </p>
                      </div>
                      <div className="tab-pane" id="tab11">
                        <p>
                          At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis
                          praesentium voluptatum deleniti atque corrupti quos dolores et quas
                          molestias excepturi sint occaecati cupiditate non provident, similique
                          sunt in culpa qui officia deserunt mollitia animi, id est laborum et
                          dolorum fuga.
                        </p>
                        <p className="mb-0">
                          Et harum quidem rerum facilis est et expedita distinctio. Nam libero
                          tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo
                          minus id quod maxime placeat facere possimus, omnis voluptas assumenda
                          est, omnis dolor repellendus.{' '}
                        </p>
                      </div>
                      <div className="tab-pane" id="tab11">
                        <p>
                          At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis
                          praesentium voluptatum deleniti atque corrupti quos dolores et quas
                          molestias excepturi sint occaecati cupiditate non provident, similique
                          sunt in culpa qui officia deserunt mollitia animi, id est laborum et
                          dolorum fuga.
                        </p>
                        <p className="mb-0">
                          Et harum quidem rerum facilis est et expedita distinctio. Nam libero
                          tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo
                          minus id quod maxime placeat facere possimus, omnis voluptas assumenda
                          est, omnis dolor repellendus.{' '}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <button type="button" className="btn call-to-action text-white mt-1 mb-1 mr-1">
                  Tutors <span className="badge badge-light">22</span>
                </button>
              </Spinner>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
