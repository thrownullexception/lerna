import * as React from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { IProps, ITutorSkillForm } from './ListTutorSkills.types';
import './styles.scss';
import { TutorSkillForm } from './forms';
import { StringFilters } from '../../../../shared/filters';

export class ListTutorSkills extends React.Component<IProps> {
  state = {
    isModalOpen: false,
    currentTutorSkillId: '',
  };

  componentDidMount() {
    this.props.getTutorSkills();
    this.props.getSkillsWithNoChildrenList();
    this.props.getTutorSkillLevels();
  }

  getSnapshotBeforeUpdate(prevProp: IProps) {
    if (prevProp.isMakingFormRequest && !this.props.isMakingFormRequest) {
      this.toggleModal();
    }
  }

  renderSkillCard = () => {
    return this.props.tutorSkills.map(({ skillName, skillId, years, rate, levelName, id }) => {
      return (
        <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12" key={skillId}>
          <div className="card overflow-hidden">
            <div className="card-body" onClick={() => this.toggleModal(id)}>
              <div className="d-flex list-tutor-skills__container">
                <div className="my-auto">
                  <img
                    src="/assets/images/skills/javascript.png"
                    className="list-tutor-skills__skill-logo"
                  />
                </div>
                <div className="list-tutor-skills__content">
                  <h6>
                    {skillName}
                    <span className="pull-right">{StringFilters.formatMoney(rate)}/hr</span>
                  </h6>
                  <ul className="list-tutor-skills__list">
                    <li className="list-tutor-skills__list-item">
                      <strong className="list-tutor-skills__list-label">Level</strong>
                      <span className="list-tutor-skills__list-value">{levelName}</span>
                    </li>
                    <li>
                      <strong className="list-tutor-skills__list-label">Years</strong>
                      <span className="list-tutor-skills__list-value">{years}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    });
  };

  renderAddSkillButton = () => {
    return (
      <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12">
        <div className="card overflow-hidden">
          <div className="card-body" onClick={() => this.toggleModal()}>
            <div className="d-flex list-tutor-skills__container">
              <div>
                <i className="fa fa-4x fa-plus list-tutor-skills__add-new-icon" />
              </div>
              <div className="list-tutor-skills__content text-center">
                <h6 className="list-tutor-skills__add-new-text">Add New Skill</h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  toggleModal = (currentTutorSkillId = '') => {
    this.setState({ isModalOpen: !this.state.isModalOpen, currentTutorSkillId });
  };

  onCreateTutorSkillSubmit = (values: ITutorSkillForm) => {
    this.props.createTutorSkill(values);
  };

  onUpdateTutorSkillSubmit = (values: ITutorSkillForm) => {
    this.props.updateTutorSkill(values);
  };

  onDeleteTutorSkill = () => {
    this.props.deleteTutorSkill(this.state.currentTutorSkillId);
    this.toggleModal();
  };

  renderCreateModal = () => {
    const { isModalOpen, currentTutorSkillId } = this.state;
    const { isMakingFormRequest, skillsWithNoChildren, tutorSkillLevels } = this.props;
    return (
      <Modal isOpen={isModalOpen && !currentTutorSkillId} toggle={() => this.toggleModal()}>
        <ModalHeader toggle={() => this.toggleModal()}>Add A Skill You Can Teach</ModalHeader>
        <ModalBody>
          <TutorSkillForm
            onSubmit={this.onCreateTutorSkillSubmit}
            isMakingRequest={isMakingFormRequest}
            skills={skillsWithNoChildren}
            tutorSkillLevels={tutorSkillLevels}
          />
        </ModalBody>
      </Modal>
    );
  };

  renderUpdateModal = () => {
    const { isModalOpen, currentTutorSkillId } = this.state;
    const { isMakingFormRequest, skillsWithNoChildren, tutorSkillLevels, tutorSkills } = this.props;
    const tutorSkill = tutorSkills.find(({ id }) => id === currentTutorSkillId);
    if (!tutorSkill) {
      return null;
    }
    return (
      <Modal isOpen={isModalOpen && !!currentTutorSkillId} toggle={() => this.toggleModal()}>
        <ModalHeader toggle={() => this.toggleModal()}>Update Skill</ModalHeader>
        <ModalBody>
          <TutorSkillForm
            onSubmit={this.onUpdateTutorSkillSubmit}
            onDelete={this.onDeleteTutorSkill}
            isMakingRequest={isMakingFormRequest}
            skills={skillsWithNoChildren}
            initialValues={tutorSkill}
            tutorSkillLevels={tutorSkillLevels}
          />
        </ModalBody>
      </Modal>
    );
  };

  render() {
    return (
      <div className="row row-sm">
        {this.renderUpdateModal()}
        {this.renderCreateModal()}
        {this.renderAddSkillButton()}
        {this.renderSkillCard()}
      </div>
    );
  }
}
