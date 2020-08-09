import { Dispatch } from 'redux';
import { ThunkInterface } from '../../shared/types';
import { RequestService, ToastService } from '../../services';
import { TutorSkillResponse } from './responses';
import { tutorSkillsSlice } from './tutor-skills.ducks';

const BASE_REQUEST_PATH = 'tutor-skills';

export class TutorSkillsActions {
  static getTutorSkills(): ThunkInterface<void> {
    return async (dispatch: Dispatch) => {
      try {
        const { data } = await RequestService.get(BASE_REQUEST_PATH);
        dispatch(
          tutorSkillsSlice.actions.setTutorSkills(
            data.map((datum: object) => new TutorSkillResponse(datum)),
          ),
        );
      } catch (e) {
        ToastService.error(e);
      }
    };
  }
}
