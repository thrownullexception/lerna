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
  questionsDuration: string;
  passPercentage: string;
  noResponseDuration: string;
  skills: Array<{ skillId: string; level: string }>;
  questions: Array<{
    question: string;
    optionA: string;
    optionB: string;
    optionC?: string;
    optionD?: string;
    optionE?: string;
  }>;
}

export const CreateSessionPrefix = 'create';
