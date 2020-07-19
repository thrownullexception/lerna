import { Dispatch } from 'redux';
import { action } from 'typesafe-actions';
import { ThunkInterface } from '../../shared/types';
import { SkillsAction, ActionType } from './skills.types';
import { RequestService, ToastService, ProgressService } from '../../services';
import { SkillsWithHierarchiesResponse, SkillResponse, BareSkillResponse } from './responses';

const BASE_REQUEST_PATH = 'skills';

export class SkillActions {
  static getSkillsWithHeirarchies(): ThunkInterface<void> {
    return async (dispatch: Dispatch<SkillsAction>) => {
      ProgressService.start();
      try {
        const { data } = await RequestService.get(`${BASE_REQUEST_PATH}/with-hierarchies`);
        dispatch(
          action(ActionType.SET_SKILLS_WITH_HIERARCHIES, new SkillsWithHierarchiesResponse(data)),
        );
      } catch (e) {
        ToastService.error(e);
      }
      ProgressService.end();
    };
  }

  static getBareSkills(): ThunkInterface<void> {
    return async (dispatch: Dispatch<SkillsAction>) => {
      try {
        const { data } = await RequestService.get(`${BASE_REQUEST_PATH}/bare`);
        dispatch(
          action(
            ActionType.SET_BARE_SKILLS,
            data.map((datum: object) => new BareSkillResponse(datum)),
          ),
        );
      } catch (e) {
        ToastService.error(e);
      }
    };
  }

  static goBackInSkillsDepth(): ThunkInterface<void> {
    return async (dispatch: Dispatch<SkillsAction>) => {
      dispatch(action(ActionType.GO_BACK_IN_SKILLS_DEPTH));
    };
  }

  static setCurrentSkillId(skillId: string): ThunkInterface<void> {
    return async (dispatch: Dispatch<SkillsAction>) => {
      dispatch(action(ActionType.SET_CURRENT_SKILL_ID, skillId));
    };
  }

  static getStudentSkill(skillId: string): ThunkInterface<void> {
    return async (dispatch: Dispatch<SkillsAction>) => {
      ProgressService.start();
      try {
        const { data } = await RequestService.get(`${BASE_REQUEST_PATH}/${skillId}`);
        dispatch(action(ActionType.SET_STUDENT_SKILL, new SkillResponse(data)));
      } catch (e) {
        ToastService.error(e);
      }
      ProgressService.end();
    };
  }
}
