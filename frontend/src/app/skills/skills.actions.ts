import { Dispatch } from 'redux';
import { action } from 'typesafe-actions';
import { ThunkInterface } from '../../shared/types';
import { SkillsAction, ActionType } from './skills.types';
import { RequestService, ToastService } from '../../services';
import { SkillsResponse, SkillResponse } from './responses';

const BASE_REQUEST_PATH = 'skills';

export class SkillActions {
  static getSkills(): ThunkInterface<void> {
    return async (dispatch: Dispatch<SkillsAction>) => {
      dispatch(action(ActionType.SKILLS_REQUEST_STARTED));
      try {
        const { data } = await RequestService.get(BASE_REQUEST_PATH);
        dispatch(action(ActionType.FETCH_SKILLS_SUCCESSFULL, new SkillsResponse(data)));
      } catch (e) {
        ToastService.error(e);
      }
      dispatch(action(ActionType.SKILLS_REQUEST_ENDED));
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

  static getSkill(skillId: string): ThunkInterface<void> {
    return async (dispatch: Dispatch<SkillsAction>) => {
      dispatch(action(ActionType.SKILLS_REQUEST_STARTED));
      try {
        const { data } = await RequestService.get(`${BASE_REQUEST_PATH}/${skillId}`);
        dispatch(action(ActionType.FETCH_SKILL_SUCCESSFULL, new SkillResponse(data)));
      } catch (e) {
        ToastService.error(e);
      }
      dispatch(action(ActionType.SKILLS_REQUEST_ENDED));
    };
  }
}

// export const postFaqs = (faqsForm: IFaqsForm): ThunkInterface<void> => {
//   return async (dispatch: Dispatch<SkillsAction>) => {
//     dispatch(action(ActionType.SKILLS_REQUEST_STARTED));
//     try {
//       const { id } = await RequestService.post(BASE_REQUEST_PATH, faqsForm);
//       dispatch(
//         action(ActionType.ADD_FAQ, {
//           id,
//           faq: faqsForm,
//         }),
//       );
//       NavigationService.goTo(FaqsPath);
//       ToastService.success('Faq Created Successfully');
//     } catch (e) {
//       ToastService.error(e);
//     }
//     dispatch(action(ActionType.SKILLS_REQUEST_ENDED));
//   };
// };

// export const patchFaqs = (faqId: number, faqsForm: IFaqsForm): ThunkInterface<void> => {
//   return async (dispatch: Dispatch<SkillsAction>) => {
//     dispatch(action(ActionType.SKILLS_REQUEST_STARTED));
//     try {
//       const { id } = await RequestService.patch(`${BASE_REQUEST_PATH}/${faqId}`, faqsForm);
//       dispatch(
//         action(ActionType.UPDATE_FAQ, {
//           id,
//           faq: faqsForm,
//         }),
//       );
//       NavigationService.goTo(FaqsPath);
//       ToastService.success('Faq Updated Successfully');
//     } catch (e) {
//       ToastService.error(e);
//     }
//     dispatch(action(ActionType.SKILLS_REQUEST_ENDED));
//   };
// };

// export const deleteFaq = (faqId: number): ThunkInterface<void> => {
//   return async (dispatch: Dispatch<SkillsAction>) => {
//     dispatch(action(ActionType.SKILLS_REQUEST_STARTED));
//     try {
//       await RequestService.delete(`${BASE_REQUEST_PATH}/${faqId}`);
//       dispatch(action(ActionType.DELETE_FAQ, faqId));
//       NavigationService.goTo(FaqsPath);
//       ToastService.success('Faq Deleted Successfully');
//     } catch (e) {
//       ToastService.error(e);
//     }
//     dispatch(action(ActionType.SKILLS_REQUEST_ENDED));
//   };
// };
