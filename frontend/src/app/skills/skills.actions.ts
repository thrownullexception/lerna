import { Dispatch } from 'redux';
import { ThunkInterface } from '../../shared/types';
import { RequestService, ToastService } from '../../services';
import { SkillListResponse, SkillWithNoChildrenResponse } from './responses';
import { skillsSlice } from './skills.ducks';

const BASE_REQUEST_PATH = 'skills';

export class SkillsActions {
  static getSkillsList(): ThunkInterface<void> {
    return async (dispatch: Dispatch) => {
      try {
        const { data } = await RequestService.get(`${BASE_REQUEST_PATH}/list`);
        dispatch(
          skillsSlice.actions.setSkillsList(
            data.map((datum: object) => new SkillListResponse(datum)),
          ),
        );
      } catch (e) {
        ToastService.error(e);
      }
    };
  }

  static getSkillsWithNoChildrenList(): ThunkInterface<void> {
    return async (dispatch: Dispatch) => {
      try {
        const { data } = await RequestService.get(`${BASE_REQUEST_PATH}/with-no-children`);
        dispatch(
          skillsSlice.actions.setSkillsWithNoChildrenList(
            data.map((datum: object) => new SkillWithNoChildrenResponse(datum)),
          ),
        );
      } catch (e) {
        ToastService.error(e);
      }
    };
  }
}
