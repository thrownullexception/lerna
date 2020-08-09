import { ISkillListToPresent } from '../../../../app/student-skills/student-skills.types';
import { TutorSkillResponse } from '../../../../app/tutor-skills/responses';

export interface IProps {
  getTutorSkills: () => void;
  tutorSkills: TutorSkillResponse[];
}

export type DispatchProps = Pick<IProps, 'getTutorSkills'>;

export type StateProps = Pick<IProps, 'tutorSkills'>;
