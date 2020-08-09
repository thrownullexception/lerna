import {
  TutorSkillResponse,
  TutorSkillLevelResponse,
} from '../../../../app/tutor-skills/responses';
import { SkillListResponse } from '../../../../app/skills/responses';

export interface IProps {
  getTutorSkills: () => void;
  getSkillsList: () => void;
  getTutorSkillLevels: () => void;
  createTutorSkill: (tutorSkill: ITutorSkillForm) => void;
  tutorSkills: TutorSkillResponse[];
  isMakingFormRequest: boolean;
  tutorSkillLevels: TutorSkillLevelResponse[];
  skillsList: SkillListResponse[];
}

export type DispatchProps = Pick<
  IProps,
  'getTutorSkills' | 'getSkillsList' | 'getTutorSkillLevels' | 'createTutorSkill'
>;

export type StateProps = Pick<
  IProps,
  'tutorSkills' | 'isMakingFormRequest' | 'tutorSkillLevels' | 'skillsList'
>;

export interface ITutorSkillForm {
  skillId: string;
  level: string;
  rate: number;
  years: number;
}
