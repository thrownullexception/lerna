import { SkillListResponse } from '../skills/responses';

export enum SkillsPresentationMode {
  Favourites,
  AllSkills,
}

export interface ISkillListToPresent extends SkillListResponse {
  hasChildren: boolean;
}
