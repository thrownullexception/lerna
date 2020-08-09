import { Dispatch } from 'redux';
import { ThunkInterface } from '../../shared/types';
import { RequestService, ToastService, ProgressService } from '../../services';
import {
  FavouriteSkillsAndCompletedRoadMapsResponse,
  SkillHierarchyResponse,
  StudentSkillDetailResponse,
} from './responses';
import { studentSkillsSlice } from './student-skills.ducks';
import { AuthSelectors } from '../auth/auth.selectors';
import { IStore } from '../../store/rootReducers';
import { SkillsPresentationMode } from './student-skills.types';

const BASE_REQUEST_PATH = 'skills';

export class StudentSkillsActions {
  static getSkillHeirarchies(): ThunkInterface<void> {
    return async (dispatch: Dispatch) => {
      ProgressService.start();
      try {
        const { data } = await RequestService.get(`${BASE_REQUEST_PATH}/hierarchies`);
        dispatch(
          studentSkillsSlice.actions.setSkillHierarchies(
            data.map((datum: object) => new SkillHierarchyResponse(datum)),
          ),
        );
      } catch (e) {
        ToastService.error(e);
      }
      ProgressService.end();
    };
  }

  static getMyFavouriteSkillsAndCompletedRoadMaps(): ThunkInterface<void> {
    return async (dispatch: Dispatch) => {
      try {
        const { data } = await RequestService.get(
          `${BASE_REQUEST_PATH}/my-favourite-skills-and-completed-roadmaps`,
        );
        dispatch(
          studentSkillsSlice.actions.setFavouriteSkillsAndCompletedRoadMaps(
            new FavouriteSkillsAndCompletedRoadMapsResponse(data),
          ),
        );
      } catch (e) {
        ToastService.error(e);
      }
    };
  }

  static toggleSkillFavouritism(skillId: string, isFavourited: boolean): ThunkInterface<void> {
    return async (dispatch: Dispatch, getState: () => IStore) => {
      try {
        dispatch(studentSkillsSlice.actions.toggleSkillFavouritism(skillId));
        if (isFavourited) {
          await RequestService.delete(`user-favourite-skills/${skillId}`);
          return;
        }
        return await RequestService.post(`user-favourite-skills`, {
          skillId,
          userId: AuthSelectors.selectCurrentUserId(getState()),
        });
      } catch (e) {
        ToastService.error(e);
      }
    };
  }

  static goBackInSkillsDepth(): ThunkInterface<void> {
    return async (dispatch: Dispatch) => {
      dispatch(studentSkillsSlice.actions.goBackInSkillsDepth());
    };
  }

  static changeSkillPresentationMode(
    skillPresentationMode: SkillsPresentationMode,
  ): ThunkInterface<void> {
    return async (dispatch: Dispatch) => {
      dispatch(studentSkillsSlice.actions.setSkillPresentationMode(skillPresentationMode));
    };
  }

  static setCurrentSkillId(skillId: string): ThunkInterface<void> {
    return async (dispatch: Dispatch) => {
      dispatch(studentSkillsSlice.actions.setCurrentSkillId(skillId));
    };
  }

  static getStudentSkillDetails(skillId: string): ThunkInterface<void> {
    return async (dispatch: Dispatch) => {
      ProgressService.start();
      try {
        const { data } = await RequestService.get(`${BASE_REQUEST_PATH}/${skillId}`);
        dispatch(
          studentSkillsSlice.actions.setCurrentSkillDetails(new StudentSkillDetailResponse(data)),
        );
      } catch (e) {
        ToastService.error(e);
      }
      ProgressService.end();
    };
  }
}
