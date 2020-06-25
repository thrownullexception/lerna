import { SkillResponse, SkillHierarchyResponse, SkillsResponse } from './responses';

export interface ISkillsState {
  skills: SkillResponse[];
  hierarchies: SkillHierarchyResponse[];
  isFetching: boolean;
  currentSkillId: string;
  skillsDepth: string[];
  currentSkill: SkillResponse;
}

export enum ActionType {
  SKILLS_REQUEST_STARTED = 'SKILLS_REQUEST_STARTED',
  FETCH_SKILLS_SUCCESSFULL = 'FETCH_SKILLS_SUCCESSFULL',
  SKILLS_REQUEST_ENDED = 'SKILLS_REQUEST_ENDED',
  FETCH_SKILL_SUCCESSFULL = 'FETCH_SKILL_SUCCESSFULL',
  SET_CURRENT_SKILL_ID = 'SET_CURRENT_SKILL_ID',
  GO_BACK_IN_SKILLS_DEPTH = 'GO_BACK_IN_SKILLS_DEPTH',
  ADD_SKILL = 'ADD_SKILL',
  DELETE_SKILL = 'DELETE_SKILL',
  UPDATE_SKILL = 'UPDATE_SKILL',
}

interface IFetchSkillsSuccessfull {
  type: ActionType.FETCH_SKILLS_SUCCESSFULL;
  payload: SkillsResponse;
}

interface IFetchSkillSuccessfull {
  type: ActionType.FETCH_SKILL_SUCCESSFULL;
  payload: SkillResponse;
}

interface IAddSkill {
  type: ActionType.ADD_SKILL;
  payload: {
    faq: ISkillForm;
    id: number;
  };
}

interface IUpdateSkill {
  type: ActionType.UPDATE_SKILL;
  payload: {
    faq: ISkillForm;
    id: number;
  };
}

interface ISetCurrentSkillId {
  type: ActionType.SET_CURRENT_SKILL_ID;
  payload: string;
}

interface IDeleteSkill {
  type: ActionType.DELETE_SKILL;
  payload: number;
}

interface ISkillsRequestStarted {
  type: ActionType.SKILLS_REQUEST_STARTED;
}

interface ISkillsRequestEnded {
  type: ActionType.SKILLS_REQUEST_ENDED;
}

interface IGoBackInSkillsDepth {
  type: ActionType.GO_BACK_IN_SKILLS_DEPTH;
}

interface IDefaultAction {
  type: '';
}

export type SkillsAction =
  | IFetchSkillsSuccessfull
  | ISkillsRequestStarted
  | IGoBackInSkillsDepth
  | ISkillsRequestEnded
  | IAddSkill
  | IFetchSkillSuccessfull
  | IDeleteSkill
  | ISetCurrentSkillId
  | IUpdateSkill
  | IDefaultAction;

interface ISkillForm {
  someThingWrong: string;
}
