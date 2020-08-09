import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TutorSkillResponse } from './responses';

const DOMAIN = 'tutor-skills';

export interface IState {
  tutorSkills: TutorSkillResponse[];
}

const initial: IState = {
  tutorSkills: [],
};

export const tutorSkillsSlice = createSlice({
  name: DOMAIN,
  initialState: initial,
  reducers: {
    setTutorSkills: (state, { payload }: PayloadAction<TutorSkillResponse[]>) => {
      state.tutorSkills = payload;
    },
  },
});
