import { produce } from 'immer';
import { ISkillsState, SkillsAction, ActionType } from './skills.types';
import { SkillResponse } from './responses';
import findLast from 'lodash/findLast';

const initial = {
  skills: [],
  hierarchies: [],
  currentStudentSkillId: '',
  skillsDepth: [],
  bareSkills: [],
  studentSkill: new SkillResponse({}),
};

export const skillsReducer = (state: ISkillsState = initial, action: SkillsAction) => {
  return produce(state, draftState => {
    if (action.type === ActionType.SET_SKILLS_WITH_HIERARCHIES) {
      const { skills, hierarchies } = action.payload;
      draftState.skills = skills;
      draftState.hierarchies = hierarchies;
    }

    if (action.type === ActionType.SET_CURRENT_SKILL_ID) {
      const currentStudentSkillId = action.payload;
      draftState.skillsDepth.push(currentStudentSkillId);
      draftState.currentStudentSkillId = currentStudentSkillId;
    }

    if (action.type === ActionType.GO_BACK_IN_SKILLS_DEPTH) {
      draftState.skillsDepth.pop();

      draftState.currentStudentSkillId = findLast(draftState.skillsDepth) || '';
    }

    if (action.type === ActionType.SET_STUDENT_SKILL) {
      draftState.studentSkill = action.payload;
    }
  });
};
