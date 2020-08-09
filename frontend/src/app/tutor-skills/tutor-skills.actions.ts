import { Dispatch } from 'redux';
import { ThunkInterface } from '../../shared/types';
import { RequestService, ToastService, ProgressService } from '../../services';
import { TutorSkillResponse, TutorSkillLevelResponse } from './responses';
import { tutorSkillsSlice } from './tutor-skills.ducks';
import { requestStatusSlice } from '../request-status/request-status.ducks';
import { ITutorSkillForm } from '../../screens/Skills/Tutor/List/ListTutorSkills.types';
import { mutateAUUIDIdOnMe } from '../utils';

const BASE_REQUEST_PATH = 'tutor-skills';

export class TutorSkillsActions {
  static getTutorSkills(): ThunkInterface<void> {
    return async (dispatch: Dispatch) => {
      dispatch(requestStatusSlice.actions.dataRequestStarted());
      try {
        const { data } = await RequestService.get(BASE_REQUEST_PATH);
        dispatch(tutorSkillsSlice.actions.setTutorSkills(data.map((datum: object) => datum)));
      } catch (e) {
        ToastService.error(e);
      }
      dispatch(requestStatusSlice.actions.dataRequestEnded());
    };
  }

  static deleteTutorSkill(tutorSkillId: string): ThunkInterface<void> {
    return async (dispatch: Dispatch) => {
      ProgressService.start();
      try {
        await RequestService.delete(`${BASE_REQUEST_PATH}/${tutorSkillId}`);
        dispatch(tutorSkillsSlice.actions.deleteTutorSkill(tutorSkillId));
      } catch (e) {
        ToastService.error(e);
      }
      ProgressService.end();
    };
  }

  static createTutorSkill(tutorSkillForm: ITutorSkillForm): ThunkInterface<void> {
    return async (dispatch: Dispatch) => {
      dispatch(requestStatusSlice.actions.formRequestStarted());
      try {
        await RequestService.post(BASE_REQUEST_PATH, mutateAUUIDIdOnMe(tutorSkillForm));
        // dispatch(tutorSkillsSlice.actions.addTutorSkill(new TutorSkillResponse(tutorSkillForm)));
      } catch (e) {
        ToastService.error(e);
      }
      dispatch(requestStatusSlice.actions.formRequestEnded());
    };
  }

  static getTutorSkillLevels(): ThunkInterface<void> {
    return async (dispatch: Dispatch) => {
      try {
        const { data } = await RequestService.get('tutor-skill-levels');
        dispatch(
          tutorSkillsSlice.actions.setTutorSkillLevels(
            data.map((datum: object) => new TutorSkillLevelResponse(datum)),
          ),
        );
      } catch (e) {
        ToastService.error(e);
      }
    };
  }
}
