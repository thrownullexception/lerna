import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SkillListResponse } from './responses';

const DOMAIN = 'skills';

export interface IState {
  skillsList: SkillListResponse[];
}

const initial: IState = {
  skillsList: [],
};

export const skillsSlice = createSlice({
  name: DOMAIN,
  initialState: initial,
  reducers: {
    setSkillsList: (state, { payload }: PayloadAction<SkillListResponse[]>) => {
      state.skillsList = payload;
    },
  },
});
