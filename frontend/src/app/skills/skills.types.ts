import {
  SkillResponse,
  SkillHierarchyResponse,
  SkillsWithHierarchiesResponse,
  BareSkillResponse,
} from './responses';

export interface ISkillsState {
  skills: SkillResponse[];
  bareSkills: SkillResponse[];
  hierarchies: SkillHierarchyResponse[];
  currentStudentSkillId: string;
  skillsDepth: string[];
  studentSkill: SkillResponse;
}

export enum ActionType {
  SET_SKILLS_WITH_HIERARCHIES = 'SET_SKILLS_WITH_HIERARCHIES',
  SET_BARE_SKILLS = 'SET_BARE_SKILLS',
  SET_STUDENT_SKILL = 'SET_STUDENT_SKILL',
  SET_CURRENT_SKILL_ID = 'SET_CURRENT_SKILL_ID',
  GO_BACK_IN_SKILLS_DEPTH = 'GO_BACK_IN_SKILLS_DEPTH',
}

interface ISetSkillsWithHierarchies {
  type: ActionType.SET_SKILLS_WITH_HIERARCHIES;
  payload: SkillsWithHierarchiesResponse;
}

interface ISetBareSkills {
  type: ActionType.SET_BARE_SKILLS;
  payload: BareSkillResponse[];
}

interface ISetStudentSkill {
  type: ActionType.SET_STUDENT_SKILL;
  payload: SkillResponse;
}

interface ISetCurrentSkillId {
  type: ActionType.SET_CURRENT_SKILL_ID;
  payload: string;
}

interface IGoBackInSkillsDepth {
  type: ActionType.GO_BACK_IN_SKILLS_DEPTH;
}

interface IDefaultAction {
  type: '';
}

export type SkillsAction =
  | ISetSkillsWithHierarchies
  | IGoBackInSkillsDepth
  | ISetBareSkills
  | ISetStudentSkill
  | ISetCurrentSkillId
  | IDefaultAction;
