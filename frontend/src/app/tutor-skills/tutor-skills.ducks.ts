import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TutorSkillResponse, TutorSkillLevelResponse } from './responses';

const DOMAIN = 'tutor-skills';

export interface IState {
  tutorSkills: TutorSkillResponse[];
  tutorSkillLevels: TutorSkillLevelResponse[];
}

const initial: IState = {
  tutorSkills: [],
  tutorSkillLevels: [],
};

export const tutorSkillsSlice = createSlice({
  name: DOMAIN,
  initialState: initial,
  reducers: {
    setTutorSkills: (state, { payload }: PayloadAction<TutorSkillResponse[]>) => {
      state.tutorSkills = payload;
    },
    addTutorSkill: (state, { payload }: PayloadAction<TutorSkillResponse>) => {
      state.tutorSkills.push(payload);
    },
    setTutorSkillLevels: (state, { payload }: PayloadAction<TutorSkillLevelResponse[]>) => {
      state.tutorSkillLevels = payload;
    },
    deleteTutorSkill: (state, { payload: tutorSkillId }: PayloadAction<string>) => {
      const tutorSkillIndex = state.tutorSkills.findIndex(({ id }) => id === tutorSkillId);
      state.tutorSkills.splice(tutorSkillIndex, 1);
    },
  },
});
