import { Dispatch } from 'redux';
import { ThunkInterface } from '../../shared/types';
import { RequestService, ToastService, ProgressService } from '../../services';
import { TutorSkillResponse, SkillLevelResponse } from './responses';
import { tutorSkillsSlice } from './tutor-skills.ducks';
import { requestStatusSlice } from '../request-status/request-status.ducks';
import { ITutorSkillForm } from '../../screens/Skills/Tutor/List/ListTutorSkills.types';
import { mutateAUUIDIdOnMe } from '../utils';
import { IStore } from '../../store/rootReducers';

const BASE_REQUEST_PATH = 'tutor-skills';

export class TutorSkillsActions {
  static getTutorSkills(): ThunkInterface<void> {
    return async (dispatch: Dispatch) => {
      dispatch(requestStatusSlice.actions.dataRequestStarted());
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
      dispatch(requestStatusSlice.actions.dataRequestEnded());
    };
  }

  static deleteTutorSkill(tutorSkillId: string): ThunkInterface<void> {
    return async (dispatch: Dispatch) => {
      ProgressService.start();
      try {
        dispatch(tutorSkillsSlice.actions.deleteTutorSkill(tutorSkillId));
        await RequestService.delete(`${BASE_REQUEST_PATH}/${tutorSkillId}`);
        ToastService.success('Skill Deleted Successfully');
      } catch (e) {
        ToastService.error(e);
      }
      ProgressService.end();
    };
  }

  static createTutorSkill(tutorSkillForm: ITutorSkillForm): ThunkInterface<void> {
    return async (dispatch: Dispatch, getState: () => IStore) => {
      dispatch(requestStatusSlice.actions.formRequestStarted());
      try {
        await RequestService.post(BASE_REQUEST_PATH, mutateAUUIDIdOnMe(tutorSkillForm));
        dispatch(
          tutorSkillsSlice.actions.addTutorSkill(
            new TutorSkillResponse(tutorSkillForm, getState()),
          ),
        );
        ToastService.success('Skill Added Successfully');
      } catch (e) {
        ToastService.error(e);
      }
      dispatch(requestStatusSlice.actions.formRequestEnded());
    };
  }

  static updateTutorSkill(tutorSkillForm: ITutorSkillForm): ThunkInterface<void> {
    return async (dispatch: Dispatch, getState: () => IStore) => {
      dispatch(requestStatusSlice.actions.formRequestStarted());
      try {
        await RequestService.patch(`${BASE_REQUEST_PATH}/${tutorSkillForm.id}`, tutorSkillForm);
        dispatch(
          tutorSkillsSlice.actions.updateTutorSkill(
            new TutorSkillResponse(tutorSkillForm, getState()),
          ),
        );
        ToastService.success('Skill Edited Successfully');
      } catch (e) {
        ToastService.error(e);
      }
      dispatch(requestStatusSlice.actions.formRequestEnded());
    };
  }

  static getSkillLevels(): ThunkInterface<void> {
    return async (dispatch: Dispatch) => {
      try {
        const { data } = await RequestService.get('tutor-skill-levels');
        dispatch(
          tutorSkillsSlice.actions.setSkillLevels(
            data.map((datum: object) => new SkillLevelResponse(datum)),
          ),
        );
      } catch (e) {
        ToastService.error(e);
      }
    };
  }
}
