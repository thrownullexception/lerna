import { Dispatch } from 'redux';
import { ThunkInterface } from '../../shared/types';
import { RequestService, ToastService, ProgressService } from '../../services';
import { SkillsWithHierarchiesResponse, SkillResponse, AllSkillResponse } from './responses';
import { skillsSlice } from './skills.ducks';

const BASE_REQUEST_PATH = 'skills';

export class SkillActions {
  static getSkillsWithHeirarchies(): ThunkInterface<void> {
    return async (dispatch: Dispatch) => {
      ProgressService.start();
      try {
        const { data } = await RequestService.get(`${BASE_REQUEST_PATH}/with-hierarchies`);
        dispatch(
          skillsSlice.actions.setSkillsWithHierarchies(new SkillsWithHierarchiesResponse(data)),
        );
      } catch (e) {
        ToastService.error(e);
      }
      ProgressService.end();
    };
  }

  static getAllSkills(): ThunkInterface<void> {
    return async (dispatch: Dispatch) => {
      try {
        const { data } = await RequestService.get(`${BASE_REQUEST_PATH}/all`);
        dispatch(
          skillsSlice.actions.setAllSkills(
            data.map((datum: object) => new AllSkillResponse(datum)),
          ),
        );
      } catch (e) {
        ToastService.error(e);
      }
    };
  }

  static goBackInSkillsDepth(): ThunkInterface<void> {
    return async (dispatch: Dispatch) => {
      dispatch(skillsSlice.actions.goBackInSkillsDepth());
    };
  }

  static setCurrentSkillId(skillId: string): ThunkInterface<void> {
    return async (dispatch: Dispatch) => {
      dispatch(skillsSlice.actions.setCurrentSkillId(skillId));
    };
  }

  static getStudentSkill(skillId: string): ThunkInterface<void> {
    return async (dispatch: Dispatch) => {
      ProgressService.start();
      try {
        const { data } = await RequestService.get(`${BASE_REQUEST_PATH}/${skillId}`);
        dispatch(skillsSlice.actions.setStudentSkill(new SkillResponse(data)));
      } catch (e) {
        ToastService.error(e);
      }
      ProgressService.end();
    };
  }
}
