import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  SkillResponse,
  SkillHierarchyResponse,
  SkillsWithHierarchiesResponse,
  AllSkillResponse,
} from './responses';
import findLast from 'lodash-es/findLast';

const DOMAIN = 'skills';

export interface IState {
  skills: SkillResponse[];
  bareSkills: SkillResponse[];
  hierarchies: SkillHierarchyResponse[];
  currentStudentSkillId: string;
  skillsDepth: string[];
  studentSkill: SkillResponse;
  allSkills: AllSkillResponse[];
}

const initial: IState = {
  skills: [],
  hierarchies: [],
  currentStudentSkillId: '',
  skillsDepth: [],
  bareSkills: [],
  allSkills: [],
  studentSkill: new SkillResponse({}),
};

export const skillsSlice = createSlice({
  name: DOMAIN,
  initialState: initial,
  reducers: {
    setSkillsWithHierarchies: (
      state,
      { payload: { skills, hierarchies } }: PayloadAction<SkillsWithHierarchiesResponse>,
    ) => {
      state.skills = skills;
      state.hierarchies = hierarchies;
    },
    setCurrentSkillId: (state, { payload }: PayloadAction<string>) => {
      const currentStudentSkillId = payload;
      state.skillsDepth.push(currentStudentSkillId);
      state.currentStudentSkillId = currentStudentSkillId;
    },
    goBackInSkillsDepth: state => {
      state.skillsDepth.pop();
      state.currentStudentSkillId = findLast(state.skillsDepth) || '';
    },
    setStudentSkill: (state, { payload }: PayloadAction<SkillResponse>) => {
      state.studentSkill = payload;
    },
    setAllSkills: (state, { payload }: PayloadAction<AllSkillResponse[]>) => {
      state.allSkills = payload;
    },
  },
});
