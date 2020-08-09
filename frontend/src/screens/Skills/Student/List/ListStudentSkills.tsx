import * as React from 'react';
import { TabContent, TabPane, Nav, NavLink } from 'reactstrap';
import { IProps } from './ListStudentSkills.types';
import { Spinner } from '../../../../components/Spinner';
import { SkillResourceResponse } from '../../../../app/student-skills/responses/skill-resource.response';
import { SkillListResponse } from '../../../../app/skills/responses';
import classnames from 'classnames';
import './styles.scss';
import { SkillsPresentationMode } from '../../../../app/student-skills/student-skills.types';
import { noop } from 'lodash-es';

export class ListStudentSkills extends React.Component<IProps> {
  state = {
    currentTab: 1,
  };

  componentDidMount() {
    this.props.getSkillsWithHeirarchies();
    this.props.getSkillsList();
    this.props.getMyFavouriteSkillsAndCompletedRoadMaps();
  }

  renderSkillResource = ({ id, title, link, mediaType }: SkillResourceResponse) => (
    <a className="list-group-item" href={link} target="_blank" key={id}>
      <i className="fe fe-airplay mr-2" aria-hidden="true" />
      {title}
    </a>
  );

  renderRelatedSkill = ({ id, name }: SkillListResponse) => (
    <a href="/" className="tag tag-rounded tag-indigo" key={id}>
      {name}
    </a>
  );

  renderSkillsListToPresent = () => {
    const {
      skillsListToPresent,
      getStudentSkill,
      setCurrentSkillId,
      skillPresentationMode,
    } = this.props;
    const isFetching = false;
    return (
      <div className="list-group">
        <Spinner isFetching={isFetching}>
          {skillsListToPresent.map(({ id, name, hasChildren }) => {
            const hasDepth =
              hasChildren && skillPresentationMode === SkillsPresentationMode.AllSkills;
            return (
              <button
                className="list-group-item link-like"
                onClick={() => {
                  getStudentSkill(id);
                  if (hasDepth) {
                    setCurrentSkillId(id);
                  }
                }}
                key={id}
              >
                <div className="event-indicator bg-info" />
                <h6 className="mg-t-5">
                  {name}
                  {hasDepth ? (
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
            );
          })}
          {skillPresentationMode === SkillsPresentationMode.Favourites &&
          skillsListToPresent.length === 0 ? (
            <button
              className="list-group-item link-like"
              onClick={() => {
                noop();
              }}
            >
              <h6 className="mg-t-5">You haven't favourited any skill yet</h6>
            </button>
          ) : null}
        </Spinner>
      </div>
    );
  };

  renderSkillOverviewTabContent = () => {
    const { currentStudentSkill } = this.props;

    return (
      <>
        <div className="mt-2">
          <p>
            Lorem Ipsum generators on the Internet as necessary aut odit aut fugit, sed quia
            consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
          </p>
        </div>
        {currentStudentSkill.relatedSkills.length > 0 ? (
          <>
            <h5> Related Skills </h5>
            <div className="tags">
              {currentStudentSkill.relatedSkills.map(skill$1 => this.renderRelatedSkill(skill$1))}
            </div>
          </>
        ) : null}
        {currentStudentSkill.resources.length > 0 ? (
          <>
            <h5 className="mt-3"> Resources </h5>
            <ul className="list-group">
              {currentStudentSkill.resources.map(resource => this.renderSkillResource(resource))}
            </ul>
          </>
        ) : null}
      </>
    );
  };

  renderSkillHeader = () => {
    const {
      favouriteSkillIds,
      toggleSkillFavouritism,
      currentStudentSkill,
      skillsBreadCrumbs,
    } = this.props;
    if (!currentStudentSkill.id) {
      return null;
    }
    const isSkillAFavourite = favouriteSkillIds.includes(currentStudentSkill.id);
    return (
      <div className="media d-block d-sm-flex">
        <img
          className="list-student-skills__skill-logo"
          src="https://avatars0.githubusercontent.com/u/8915890?s=460&u=0d64410a743190d194ebd2cf1ba42d8584fdf3ce&v=4"
        />
        <div className="media-body list-student-skills__skill-title-wrapper">
          <h5 className="card-title list-student-skills__skill-title">
            {' '}
            {currentStudentSkill.name}
          </h5>
          <p>
            {skillsBreadCrumbs.map(skillBreadCrumb => (
              <a href="#" key={skillBreadCrumb.id} className="list-student-skills__breadcrumb">
                {skillBreadCrumb.name}
              </a>
            ))}
          </p>
        </div>
        <button
          className="link-like"
          onClick={() => toggleSkillFavouritism(currentStudentSkill.id, isSkillAFavourite)}
        >
          <i
            className={classnames({
              'fa fa-2x list-student-skills__skill-heart': true,
              'fa-heart': isSkillAFavourite,
              'fa-heart-o': !isSkillAFavourite,
            })}
          />
        </button>{' '}
      </div>
    );
  };

  renderSkillTabPills = () => {
    const { currentStudentSkill } = this.props;
    const { currentTab } = this.state;

    return (
      <div className="tab-menu-heading">
        <div className="tabs-menu ">
          <Nav pills={true} tag="nav" className="flex-column flex-md-row">
            <NavLink
              className={classnames({ active: currentTab === 1 })}
              onClick={() => {
                this.setCurrentTab(1);
              }}
            >
              <i className="fa fa-laptop" /> Overview
            </NavLink>
            <NavLink
              className={classnames({ active: currentTab === 2 })}
              onClick={() => {
                this.setCurrentTab(2);
              }}
            >
              <i className="fa fa-cube" /> Community
            </NavLink>
            <NavLink
              className={classnames({ active: currentTab === 3 })}
              onClick={() => {
                this.setCurrentTab(3);
              }}
            >
              <i className="fa fa-tasks" /> Road Map{' '}
              <span className="badge badge-light">21/{currentStudentSkill.roadMaps.length}</span>
            </NavLink>
            <NavLink
              className={classnames({ active: currentTab === 5 })}
              onClick={() => {
                this.setCurrentTab(4);
              }}
            >
              <i className="fa fa-tasks" /> Resources{' '}
              <span className="badge badge-light">{currentStudentSkill.resources.length}</span>
            </NavLink>
          </Nav>
        </div>
      </div>
    );
  };

  renderAllSkillsListHeader = () => {
    const {
      skillInHierarchy,
      goBackInSkillsDepth,
      skillsBreadCrumbs,
      changeSkillPresentationMode,
      skillPresentationMode,
    } = this.props;
    return (
      <div className="list-group">
        <button
          className="list-group-item link-like"
          onClick={() => {
            if (skillPresentationMode === SkillsPresentationMode.Favourites) {
              changeSkillPresentationMode(SkillsPresentationMode.AllSkills);
              return;
            }
            if (skillsBreadCrumbs.length > 0) {
              goBackInSkillsDepth();
            }
          }}
        >
          <h6>
            {skillPresentationMode === SkillsPresentationMode.AllSkills &&
            skillsBreadCrumbs.length > 0 ? (
              <i className="fe fe-arrow-left text-primary mr-2 dis" title="" />
            ) : null}
            {skillPresentationMode === SkillsPresentationMode.AllSkills
              ? skillInHierarchy.name || 'Software Eng Paths'
              : 'Software Eng Paths'}
          </h6>
        </button>
      </div>
    );
  };

  setCurrentTab = (tabNumber: number) => {
    this.setState({
      currentTab: tabNumber,
    });
  };

  render() {
    const { changeSkillPresentationMode } = this.props;
    const { currentTab } = this.state;
    const isFetching = false;
    return (
      <div className="row row-sm">
        <div className="col-lg-12 col-xl-3">
          <div className="card card--events mg-b-20">
            <div className="card-body">
              <div className="pd-20">
                <div className="list-group">
                  <button
                    className="list-group-item link-like"
                    onClick={() => changeSkillPresentationMode(SkillsPresentationMode.Favourites)}
                  >
                    <h6>Favourite Skills</h6>
                  </button>
                </div>
                {this.renderAllSkillsListHeader()}
              </div>
              {this.renderSkillsListToPresent()}
            </div>
          </div>
        </div>
        <div className="col-xl-9 col-md-12">
          <div className="card mg-b-20">
            <div className="card-body">
              <Spinner isFetching={isFetching}>
                {this.renderSkillHeader()}
                <div className="panel panel-primary tabs-style-3">
                  {this.renderSkillTabPills()}
                  <div className="panel-body tabs-menu-body">
                    <TabContent activeTab={currentTab}>
                      <TabPane tabId={1}>{this.renderSkillOverviewTabContent()}</TabPane>
                      <TabPane tabId={2}>Community Tab</TabPane>
                      <TabPane tabId={3}>Road Map Tab</TabPane>
                      <TabPane tabId={4}>Resources</TabPane>
                    </TabContent>
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
