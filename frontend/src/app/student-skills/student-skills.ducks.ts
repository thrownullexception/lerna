import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  SkillHierarchyResponse,
  FavouriteSkillsAndCompletedRoadMapsResponse,
  StudentSkillDetailResponse,
} from './responses';
import findLast from 'lodash-es/findLast';
import { SkillsPresentationMode } from './student-skills.types';

const DOMAIN = 'student-skills';

export interface IState {
  hierarchies: SkillHierarchyResponse[];
  currentSkillDetailsId: string;
  skillsDepth: string[];
  favouriteSkillIds: string[];
  completedRoadMapIds: string[];
  currentSkillDetails: StudentSkillDetailResponse;
  skillPresentationMode: SkillsPresentationMode;
}

const initial: IState = {
  hierarchies: [],
  currentSkillDetailsId: '',
  skillsDepth: [],
  favouriteSkillIds: [],
  completedRoadMapIds: [],
  currentSkillDetails: new StudentSkillDetailResponse({}),
  skillPresentationMode: SkillsPresentationMode.AllSkills,
};

export const studentSkillsSlice = createSlice({
  name: DOMAIN,
  initialState: initial,
  reducers: {
    setSkillHierarchies: (state, { payload }: PayloadAction<SkillHierarchyResponse[]>) => {
      state.hierarchies = payload;
    },
    setSkillPresentationMode: (state, { payload }: PayloadAction<SkillsPresentationMode>) => {
      state.skillPresentationMode = payload;
    },
    setCurrentSkillId: (state, { payload }: PayloadAction<string>) => {
      const currentSkillDetailsId = payload;
      state.skillsDepth.push(currentSkillDetailsId);
      state.currentSkillDetailsId = currentSkillDetailsId;
    },
    goBackInSkillsDepth: state => {
      state.skillsDepth.pop();
      state.currentSkillDetailsId = findLast(state.skillsDepth) || '';
    },
    setCurrentSkillDetails: (state, { payload }: PayloadAction<StudentSkillDetailResponse>) => {
      state.currentSkillDetails = payload;
    },
    toggleSkillFavouritism: (state, { payload: skilId }: PayloadAction<string>) => {
      const skillFavouriteIndex = state.favouriteSkillIds.findIndex(
        favouriteSkillId => favouriteSkillId === skilId,
      );
      if (skillFavouriteIndex === -1) {
        state.favouriteSkillIds.push(skilId);
        return;
      }
      state.favouriteSkillIds.splice(skillFavouriteIndex, 1);
    },
    setFavouriteSkillsAndCompletedRoadMaps: (
      state,
      { payload }: PayloadAction<FavouriteSkillsAndCompletedRoadMapsResponse>,
    ) => {
      state.favouriteSkillIds = payload.favouriteSkillIds;
      state.completedRoadMapIds = payload.completedRoadMapIds;
    },
  },
});
