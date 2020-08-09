import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SkillListResponse } from './responses';

const DOMAIN = 'skills';

export interface IState {
  skillsList: SkillListResponse[];
  skillsWithNoChildrenList: SkillListResponse[];
}

const initial: IState = {
  skillsList: [],
  skillsWithNoChildrenList: [],
};

export const skillsSlice = createSlice({
  name: DOMAIN,
  initialState: initial,
  reducers: {
    setSkillsList: (state, { payload }: PayloadAction<SkillListResponse[]>) => {
      state.skillsList = payload;
    },
    setSkillsWithNoChildrenList: (state, { payload }: PayloadAction<SkillListResponse[]>) => {
      state.skillsWithNoChildrenList = payload;
    },
  },
});
