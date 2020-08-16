import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TutorSkillResponse } from './responses';

export const DOMAIN = 'tutorSkills';

export interface IState {
  tutorSkills: TutorSkillResponse[];
}

export const initialState: IState = {
  tutorSkills: [],
};

export const tutorSkillsSlice = createSlice({
  name: DOMAIN,
  initialState,
  reducers: {
    setTutorSkills: (state, { payload }: PayloadAction<TutorSkillResponse[]>) => {
      state.tutorSkills = payload;
    },
    addTutorSkill: (state, { payload }: PayloadAction<TutorSkillResponse>) => {
      state.tutorSkills.push(payload);
    },
    updateTutorSkill: (state, { payload }: PayloadAction<TutorSkillResponse>) => {
      const tutorSkillIndex = state.tutorSkills.findIndex(({ id }) => payload.id === id);
      if (tutorSkillIndex > -1) {
        state.tutorSkills[tutorSkillIndex] = payload;
      }
    },
    deleteTutorSkill: (state, { payload: tutorSkillId }: PayloadAction<string>) => {
      const tutorSkillIndex = state.tutorSkills.findIndex(({ id }) => id === tutorSkillId);
      state.tutorSkills.splice(tutorSkillIndex, 1);
    },
  },
});
