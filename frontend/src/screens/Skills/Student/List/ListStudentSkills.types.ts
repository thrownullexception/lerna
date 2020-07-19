import { SkillResponse } from '../../../../app/skills/responses';

export interface IProps {
  getSkillsWithHeirarchies: () => void;
  getStudentSkill: (skillId: string) => void;
  setCurrentSkillId: (skillId: string) => void;
  goBackInSkillsDepth: () => void;
  skills: SkillResponse[];
  skillInHierarchy: SkillResponse;
  skill: SkillResponse;
  skillsDepth: string[];
}

export type StateProps = Pick<IProps, 'skills' | 'skill' | 'skillInHierarchy' | 'skillsDepth'>;
export type DispatchProps = Pick<
  IProps,
  'getSkillsWithHeirarchies' | 'getStudentSkill' | 'goBackInSkillsDepth' | 'setCurrentSkillId'
>;
