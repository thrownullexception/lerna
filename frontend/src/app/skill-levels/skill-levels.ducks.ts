import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SkillLevelResponse } from './responses';

const DOMAIN = 'skill-levels';

export interface IState {
  skillLevels: SkillLevelResponse[];
}

const initial: IState = {
  skillLevels: [],
};

export const skillLevelsSlice = createSlice({
  name: DOMAIN,
  initialState: initial,
  reducers: {
    setSkillLevels: (state, { payload }: PayloadAction<SkillLevelResponse[]>) => {
      state.skillLevels = payload;
    },
  },
});
