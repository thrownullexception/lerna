import { SkillResponse } from '../../../../app/skills/responses';

export interface IProps {
  getSkills: () => void;
  getSkill: (skillId: string) => void;
  goBackInSkillsDepth: () => void;
  skills: SkillResponse[];
  skill: SkillResponse;
  skillsDepth: string[];
  isFetching: boolean;
}

export type StateProps = Pick<IProps, 'skills' | 'skill' | 'isFetching' | 'skillsDepth'>;
export type DispatchProps = Pick<IProps, 'getSkills' | 'getSkill' | 'goBackInSkillsDepth'>;
