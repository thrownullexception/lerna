import {
  TutorSkillResponse,
  TutorSkillLevelResponse,
} from '../../../../app/tutor-skills/responses';
import { SkillWithNoChildrenResponse } from '../../../../app/skills/responses';

export interface IProps {
  getTutorSkills: () => void;
  getSkillsWithNoChildrenList: () => void;
  getTutorSkillLevels: () => void;
  createTutorSkill: (tutorSkill: ITutorSkillForm) => void;
  updateTutorSkill: (tutorSkill: ITutorSkillForm) => void;
  deleteTutorSkill: (tutorSkillId: string) => void;
  tutorSkills: TutorSkillResponse[];
  isMakingFormRequest: boolean;
  tutorSkillLevels: TutorSkillLevelResponse[];
  skillsWithNoChildren: SkillWithNoChildrenResponse[];
}

export type DispatchProps = Pick<
  IProps,
  | 'getTutorSkills'
  | 'getSkillsWithNoChildrenList'
  | 'getTutorSkillLevels'
  | 'deleteTutorSkill'
  | 'createTutorSkill'
  | 'updateTutorSkill'
>;

export type StateProps = Pick<
  IProps,
  'tutorSkills' | 'isMakingFormRequest' | 'tutorSkillLevels' | 'skillsWithNoChildren'
>;

export interface ITutorSkillForm {
  id?: string;
  skillId?: string;
  level?: string;
  rate?: number;
  years?: number;
}
