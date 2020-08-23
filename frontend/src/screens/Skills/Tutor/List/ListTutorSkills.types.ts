import { TutorSkillResponse } from '../../../../app/tutor-skills/responses';
import { SkillWithNoChildrenResponse } from '../../../../app/skills/responses';
import { SkillLevelResponse } from '../../../../app/skill-levels/responses';

export interface IProps {
  getTutorSkills: () => void;
  getSkillsWithNoChildrenList: () => void;
  getSkillLevels: () => void;
  createTutorSkill: (tutorSkill: ITutorSkillForm) => void;
  updateTutorSkill: (tutorSkill: ITutorSkillForm) => void;
  deleteTutorSkill: (tutorSkillId: string) => void;
  tutorSkills: TutorSkillResponse[];
  isMakingFormRequest: boolean;
  skillLevels: SkillLevelResponse[];
  skillsWithNoChildren: SkillWithNoChildrenResponse[];
}

export type DispatchProps = Pick<
  IProps,
  | 'getTutorSkills'
  | 'getSkillsWithNoChildrenList'
  | 'getSkillLevels'
  | 'deleteTutorSkill'
  | 'createTutorSkill'
  | 'updateTutorSkill'
>;

export type StateProps = Pick<
  IProps,
  'tutorSkills' | 'isMakingFormRequest' | 'skillLevels' | 'skillsWithNoChildren'
>;

export interface ITutorSkillForm {
  id?: string;
  skillId?: string;
  levelSystemName?: string;
  rate?: number;
  years?: number;
}
