import { StudentSkillDetailResponse } from '../../../../app/student-skills/responses';
import {
  SkillsPresentationMode,
  ISkillListToPresent,
} from '../../../../app/student-skills/student-skills.types';
import { SkillListResponse } from '../../../../app/skills/responses';

export interface IProps {
  getSkillsWithHeirarchies: () => void;
  getStudentSkill: (skillId: string) => void;
  setCurrentSkillId: (skillId: string) => void;
  goBackInSkillsDepth: () => void;
  getSkillsList: () => void;
  getMyFavouriteSkillsAndCompletedRoadMaps: () => void;
  toggleSkillFavouritism: (skillId: string, isFavourite: boolean) => void;
  changeSkillPresentationMode: (skillPresentationMode: SkillsPresentationMode) => void;
  skillsListToPresent: ISkillListToPresent[];
  skillInHierarchy: SkillListResponse;
  currentStudentSkill: StudentSkillDetailResponse;
  completedRoadMapIds: string[];
  skillPresentationMode: SkillsPresentationMode;
  favouriteSkillIds: string[];
  skillsBreadCrumbs: SkillListResponse[];
}

export type DispatchProps = Pick<
  IProps,
  | 'getSkillsWithHeirarchies'
  | 'getStudentSkill'
  | 'getSkillsList'
  | 'goBackInSkillsDepth'
  | 'changeSkillPresentationMode'
  | 'setCurrentSkillId'
  | 'getMyFavouriteSkillsAndCompletedRoadMaps'
  | 'toggleSkillFavouritism'
>;

export type StateProps = Pick<
  IProps,
  | 'skillsListToPresent'
  | 'currentStudentSkill'
  | 'skillInHierarchy'
  | 'skillsBreadCrumbs'
  | 'skillPresentationMode'
  | 'favouriteSkillIds'
  | 'completedRoadMapIds'
>;
