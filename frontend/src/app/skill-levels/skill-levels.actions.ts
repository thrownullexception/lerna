import { Dispatch } from 'redux';
import { ThunkInterface } from '../../shared/types';
import { RequestService, ToastService } from '../../services';
import { SkillLevelResponse } from './responses';
import { skillLevelsSlice } from './skill-levels.ducks';

const BASE_REQUEST_PATH = 'skill-levels';

export class SkillLevelsActions {
  static getSkillLevels(): ThunkInterface<void> {
    return async (dispatch: Dispatch) => {
      try {
        const { data } = await RequestService.get(BASE_REQUEST_PATH);
        dispatch(
          skillLevelsSlice.actions.setSkillLevels(
            data.map((datum: object) => new SkillLevelResponse(datum)),
          ),
        );
      } catch (e) {
        ToastService.error(e);
      }
    };
  }
}
