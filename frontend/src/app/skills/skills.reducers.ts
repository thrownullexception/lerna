import { produce } from 'immer';
import { ISkillsState, SkillsAction, ActionType } from './skills.types';
import { SkillResponse } from './responses';
import findLast from 'lodash/findLast';

const initial = {
  skills: [],
  hierarchies: [],
  currentSkillId: '',
  isFetching: false,
  skillsDepth: [],
  currentSkill: new SkillResponse({}),
};

export const skillsReducer = (state: ISkillsState = initial, action: SkillsAction) => {
  return produce(state, draftState => {
    if (action.type === ActionType.FETCH_SKILLS_SUCCESSFULL) {
      const { skills, hierarchies } = action.payload;
      draftState.skills = skills;
      draftState.hierarchies = hierarchies;
    }

    if (action.type === ActionType.SET_CURRENT_SKILL_ID) {
      const currentSkillId = action.payload;
      draftState.skillsDepth.push(currentSkillId);
      draftState.currentSkillId = currentSkillId;
    }

    if (action.type === ActionType.GO_BACK_IN_SKILLS_DEPTH) {
      draftState.skillsDepth.pop();

      draftState.currentSkillId = findLast(draftState.skillsDepth) || '';
    }

    if (action.type === ActionType.FETCH_SKILL_SUCCESSFULL) {
      draftState.currentSkill = action.payload;
    }

    if (action.type === ActionType.SKILLS_REQUEST_ENDED) {
      draftState.isFetching = false;
    }

    if (action.type === ActionType.SKILLS_REQUEST_STARTED) {
      draftState.isFetching = true;
    }
  });
};
