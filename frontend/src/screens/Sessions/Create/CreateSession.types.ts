import { SkillLevelResponse } from '../../../app/skill-levels/responses';
import { SkillWithNoChildrenResponse } from '../../../app/skills/responses';

export interface IProps {
  createSession: (createSessionForm: ICreateSessionForm) => void;
  getSkillsWithNoChildrenList: () => void;
  getSkillLevels: () => void;
  isMakingFormRequest: boolean;
  skillLevels: SkillLevelResponse[];
  skillsWithNoChildren: SkillWithNoChildrenResponse[];
}

export type StateProps = Pick<
  IProps,
  'isMakingFormRequest' | 'skillLevels' | 'skillsWithNoChildren'
>;
export type DispatchProps = Pick<
  IProps,
  'createSession' | 'getSkillsWithNoChildrenList' | 'getSkillLevels'
>;

export interface ICreateSessionForm {
  title: string;
  description: string;
  budgetFrom: string;
  budgetTo: string;
}

export const CreateSessionPath = 'create';
